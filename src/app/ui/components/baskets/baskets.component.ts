import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/baskets/list_basket_items';
import { UpdateBasketItem } from 'src/app/contracts/baskets/update_basket_item';
import { CreateOrder } from 'src/app/contracts/orders/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/service/common/dialog.service';
import { BasketService } from 'src/app/service/common/models/basket.service';
import { OrderService } from 'src/app/service/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {

  constructor(spinnerService: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastr: CustomToastrService,
    private router: Router,
    private dialogService: DialogService) {
    super(spinnerService)
  }

  basketItems: ListBasketItem[]
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.BallAtom)


  }


  async changeQuantity(object) {
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

  removeBasketItem(i: string) {

    $("#basketModal").modal("hide")

    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {

        this.showSpinner(SpinnerType.BallAtom)


        await this.basketService.remove(i)


        $("." + i).fadeOut(500, () => {

          this.hideSpinner(SpinnerType.BallAtom)

        })

         $("#basketModal").modal("show")

      }

    })
  }

    shoppingComplete() {

      $("#basketModal").modal("hide")

    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async ()=>{

        this.showSpinner(SpinnerType.BallAtom)
        let order: CreateOrder = new CreateOrder()
        order.address = "Sakarya/Adapazari"
        order.description = "3 Prenses Bekliyoruz :)"

        await this.orderService.create(order)
        this.hideSpinner(SpinnerType.BallAtom)

        this.toastr.message("Siparisiniz Onaylanmistir", "Siparis Onayi", {

          messageType: ToastrMessageType.success,
          position: ToastrPosition.TopLeft
        })

     
        this.router.navigate(["/"])

      }
      
    })

    

  }



}
