import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { CreateOrder } from 'src/app/contracts/orders/create_order';
import { ListOrder } from 'src/app/contracts/orders/list_order';
import { SingleOrder } from 'src/app/contracts/orders/signle_order';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }


  async create(order: CreateOrder): Promise<void>{

    const observable: Observable<CreateOrder> =  this.httpClientService.post<CreateOrder>({
      controller: "orders"
    }, order)

    await firstValueFrom(observable)

  }

  async getAllOrders(
    page:number = 0,
    size:number=5,
     successCallBack?:()=> void,
       errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalOrderCount:number, orders:ListOrder[]}>{
    const observable: Observable<{totalOrderCount:number, orders:ListOrder[]}> = this.httpClientService.get<{totalOrderCount:number, orders:ListOrder[]}>({
      controller:"orders",
      queryString:`page=${page}&size=${size}` 
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error))

    return await promiseData
  }


  async getOrdeById(id: string, successCallBack?:()=> void,
  errorCallBack?: (errorMessage: string) => void ){

    const observable: Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller: "orders",

    }, id)

    const promiseData = firstValueFrom(observable)

    promiseData.then(()=> successCallBack())
    .catch(error => errorCallBack(error))


    return await promiseData

  }

  async completeOrder(id: string, successCallBack?:()=>void){
    const observable: Observable<any> = this.httpClientService.get({
      controller:"orders",
      action:"CompleteOrder"
    }, id)


    await firstValueFrom(observable)

    successCallBack()
  }
}
