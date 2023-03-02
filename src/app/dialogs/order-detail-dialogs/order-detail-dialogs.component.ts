import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleOrder } from 'src/app/contracts/orders/signle_order';
import { DialogService } from 'src/app/service/common/dialog.service';
import { OrderService } from 'src/app/service/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';




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
    private orderService:OrderService,
    private dialogService:DialogService,
    private toastr: CustomToastrService
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



  completeOrder(){
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.YES,
      afterClosed: async ()=>{

        this.orderService.completeOrder(this.data as string, ()=>{

          this.toastr.message("Siparis Onaylandi", "Siparis Tamamlama",{
            messageType: ToastrMessageType.success,
            position:ToastrPosition.BottomLeft
          })
          
        })
        
      }
    })

  }




}

export enum OrderDetailDialogState{
  CLOSE,
  ORDERCOMPLETE
}
