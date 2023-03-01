
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';


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

  async updatePassword(userId:string, resetToken:string, password:string, passwordConfirm:string,
     successCallBack?:()=>void, errorCallBack?:(error)=>void){

    const observable: Observable<any> = this.httpClientService.post<any>({
      controller:"users",
      action:"UpdatePassword"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm

    })

    const promiseData: Promise<any> =  firstValueFrom(observable)

    promiseData.then(value => successCallBack()).catch(error=> errorCallBack(error))

    await promiseData
   

  }

}

