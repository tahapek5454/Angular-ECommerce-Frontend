
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';


import { CreateUser } from 'src/app/contracts/users/create_user';
import { ListUser } from 'src/app/contracts/users/list_user';
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


  async getAllUsers(
    page:number = 0,
    size:number=5,
     successCallBack?:()=> void,
       errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalUsersCount:number, users:ListUser[]}>{
    const observable: Observable<{totalUsersCount:number, users:ListUser[]}> = this.httpClientService.get<{totalUsersCount:number, users:ListUser[]}>({
      controller:"users",
      queryString:`page=${page}&size=${size}` 
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(value => successCallBack())
    

    return await promiseData
  }

  async assignRoleToUser(id:string, roles:string[], successCallBack?:()=> void){
    const observable :Observable<any> = this.httpClientService.post({
      controller:"users",
      action:"AssignRoleToUser"
    }, {id: id, roles: roles})



    const promiseData = firstValueFrom(observable)

    promiseData.then(()=>{
      successCallBack()
      this.toastrService.message("Yetkilendirme Islemi Basarili","Yetkilendirme",{
        messageType:ToastrMessageType.success,
        position:ToastrPosition.BottomLeft
      })
    })

     
    await promiseData

  }

  async getRolesToUser(id:string, successCallBack?:()=>void):Promise<string[]>{
    const observable: Observable<{userRoles: string[]}> = this.httpClientService.get({
      controller:"users",
      action:"GetRolesToUser"
    },id)

    const promiseData = firstValueFrom(observable)

    promiseData.then(()=>{
      successCallBack()
      this.toastrService.message("Listeleme Basarili","Listeleme",{
        messageType:ToastrMessageType.success,
        position:ToastrPosition.BottomLeft
      })
    })

    const result = await promiseData
    return result.userRoles
  }

}

