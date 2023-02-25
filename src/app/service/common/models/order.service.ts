import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { CreateOrder } from 'src/app/contracts/orders/create_order';
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
}
