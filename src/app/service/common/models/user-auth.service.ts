import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/tokens/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService, private toastrService:CustomToastrService) { }



  async login(userNameOrEmail:string, password:string, callBack?: ()=> void):Promise<void>{
    var observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action: "LoginUser"
    }, {userNameOrEmail, password})

    const tokenResponse:TokenResponse =  await firstValueFrom(observable) as TokenResponse

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
    }

    callBack()

    this.toastrService.message("Kullanıcı Girişi Başarılı", "Giriş Başarılı",{
      messageType: ToastrMessageType.success,
      position: ToastrPosition.BottomRight
    })

  }

  async refreshTokenLogin(refreshToken:String, callBack?:(state)=>void){

    const observable:Observable<any |TokenResponse> = this.httpClientService.post({
      action: "RefreshToken",
      controller: "auth"
    }, {refreshToken: refreshToken})


    try{
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)
    }


    callBack(tokenResponse ? true: false)
    }catch{
    callBack(false)

    }

  }


  async googleLogin(user: SocialUser, callBack? :()=> void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse>= this.httpClientService.post<SocialUser | TokenResponse>({
      action: "GoogleLogin",
      controller: "auth"
    }, user)

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken)

    

    this.toastrService.message("Kullanıcı Girişi Başarılı", "Giriş Başarılı",{
      messageType: ToastrMessageType.success,
      position: ToastrPosition.BottomRight
    })


    }

    callBack()

  }

}
