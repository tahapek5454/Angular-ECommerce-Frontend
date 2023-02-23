import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateBasketItem } from 'src/app/contracts/baskets/create_basket_item';
import { ListBasketItem } from 'src/app/contracts/baskets/list_basket_items';
import { UpdateBasketItem } from 'src/app/contracts/baskets/update_basket_item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  async get(): Promise<ListBasketItem[]>{
     const observable: Observable<ListBasketItem[]> = this.httpClientService.get({
      controller:"baskets"
     })

    return await firstValueFrom(observable)
     
  }

  async add(basketItem: CreateBasketItem): Promise<void>{
    const observable: Observable<any| CreateBasketItem> = this.httpClientService.post<any | CreateBasketItem>({
      controller: "baskets"
    },basketItem)

    await firstValueFrom(observable)
  }


  async put(basketItem: UpdateBasketItem): Promise<void>{

    const observable: Observable<any | UpdateBasketItem> = this.httpClientService.put<any | UpdateBasketItem>({
      controller:"baskets"
    }, basketItem)

    await firstValueFrom(observable)

  }

  async remove(basketItemId: string): Promise<void>{
    const observable: Observable<any> = this.httpClientService.delete<any>({
      controller:"baskets"
    }, basketItemId)

    await firstValueFrom(observable)
  }

}
