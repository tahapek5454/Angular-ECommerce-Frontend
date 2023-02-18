import { SocialUser } from '@abacritt/angularx-social-login/public-api';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

import { TokenResponse } from 'src/app/contracts/tokens/tokenResponse';
import { CreateUser } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService, private toastrService:CustomToastrService) { }


 async create(user:User): Promise<CreateUser>{
      const observable:Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
        controller:"users"

      }, user)


      return await firstValueFrom(observable) as CreateUser
  }

  async login(userNameOrEmail:string, password:string, callBack?: ()=> void):Promise<void>{
    var observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"users",
      action: "LoginUser"
    }, {userNameOrEmail, password})

    const tokenResponse:TokenResponse =  await firstValueFrom(observable) as TokenResponse

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
    }

    callBack()

    this.toastrService.message("Kullanıcı Girişi Başarılı", "Giriş Başarılı",{
      messageType: ToastrMessageType.success,
      position: ToastrPosition.BottomRight
    })

  }


  async googleLogin(user: SocialUser, callBack? :()=> void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse>= this.httpClientService.post<SocialUser | TokenResponse>({
      action: "GoogleLogin",
      controller: "users"
    }, user)

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)

    

    this.toastrService.message("Kullanıcı Girişi Başarılı", "Giriş Başarılı",{
      messageType: ToastrMessageType.success,
      position: ToastrPosition.BottomRight
    })


    }

    callBack()

  }

}

