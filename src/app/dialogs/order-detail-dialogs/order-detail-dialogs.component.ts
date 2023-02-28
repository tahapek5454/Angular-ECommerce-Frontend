import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleOrder } from 'src/app/contracts/orders/signle_order';
import { OrderService } from 'src/app/service/common/models/order.service';
import { BaseDialog } from '../base/base-dialog';




@Component({
  selector: 'app-order-detail-dialogs',
  templateUrl: './order-detail-dialogs.component.html',
  styleUrls: ['./order-detail-dialogs.component.scss']
})
export class OrderDetailDialogsComponent extends BaseDialog<OrderDetailDialogsComponent> implements OnInit{

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource =[]
  clickedRows = new Set<any>();
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService:OrderService
  ) {
    super(dialogRef);

  }

  singleOrder:SingleOrder
  totalPrice:number

  async ngOnInit() {
   this.singleOrder =  await this.orderService.getOrdeById(this.data as string)
   this.dataSource = this.singleOrder.basketItems
   this.totalPrice = this.singleOrder.basketItems.map((item, index) => item.price * item.quantity)
                      .reduce((price, current)=> price+current)
   
  }





}

export enum OrderDetailDialogState{
  CLOSE,
  ORDERCOMPLETE
}
