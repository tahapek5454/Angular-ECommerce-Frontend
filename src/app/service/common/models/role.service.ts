import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService:HttpClientService) { }



  async getRoles(page:number=0, size:number=5, successCallBack? : ()=> void){
    const observable:Observable<any> = this.httpClientService.get({
      controller:"roles",
      queryString :`page=${page}&size=${size}`
    })

    const promiseData =  firstValueFrom(observable)

    promiseData.then(successCallBack)

    return await promiseData

  }

  async create(name:string, successCallBack? : ()=>void){
    const observable:Observable<any> = this.httpClientService.post({
      controller:"roles"
    },{name:name})

   const prmiseData =  firstValueFrom(observable)
   prmiseData.then(successCallBack)

   return await prmiseData as {succeeded:boolean}

  }
}
