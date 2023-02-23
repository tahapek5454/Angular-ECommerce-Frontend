import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/baskets/list_basket_items';
import { UpdateBasketItem } from 'src/app/contracts/baskets/update_basket_item';
import { BasketService } from 'src/app/service/common/models/basket.service';

declare var $:any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinnerService : NgxSpinnerService, private basketService: BasketService){
    super(spinnerService)
  }

  basketItems : ListBasketItem[]
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.BallAtom)


  }


  async changeQuantity(object){
    this.showSpinner(SpinnerType.BallAtom)

    
    debugger
    const basketItemId: string = object.target.attributes["id"].value
    const quantity: number = object.target.value
    const basketItem: UpdateBasketItem = new UpdateBasketItem()
    basketItem.basketItemId = basketItemId
    basketItem.quantity = quantity

    await this.basketService.put(basketItem)
    this.hideSpinner(SpinnerType.BallAtom)


  }

  async removeBasketItem(i: string){
      this.showSpinner(SpinnerType.BallAtom)


      await this.basketService.remove(i)


      $("." + i).fadeOut(500, ()=> {

      this.hideSpinner(SpinnerType.BallAtom)
        

      })

  }

}
