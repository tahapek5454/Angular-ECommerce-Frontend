import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService:HttpClientService, private toastr: CustomToastrService) { }


 async assignRoleEndpoint(
    roles:string[],
    code:string,
    menu:string,
    successCallBack?:()=>void
  ){

    

   const observable: Observable<any> = this.httpClientService.post({
      controller:"AuthorizationEndpoints",

    },{
      roles: roles,
      code: code,
      menu: menu
    })


    const promiseData = firstValueFrom(observable)

    promiseData.then(()=>{
      successCallBack()
      this.toastr.message("Yetkilendirme Basarili","Yetkilendirme",{
        messageType:ToastrMessageType.success,
        position:ToastrPosition.BottomLeft
      })

    })

    return await promiseData

  }


  async getRolesToEndpoint(
    code:string,
    menu:string,
    successCallBack?:()=>void
  ){
    
    const observable: Observable<any> = this.httpClientService.post({
      controller:"AuthorizationEndpoints",
      action:"GetRolesToEndpoint"
    }, {code:code, menu:menu})

    const promiseData = firstValueFrom(observable)

    promiseData.then(successCallBack)
    return await promiseData
  }
}
