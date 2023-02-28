import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListOrder } from 'src/app/contracts/orders/list_order';
import { OrderDetailDialogsComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialogs/order-detail-dialogs.component';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';

import { OrderService } from 'src/app/service/common/models/order.service';

declare var $:any
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  displayedColumns: string[] = ['orderCode','userName','totalPrice','createdDate','viewdetail','delete'];
  dataSource:MatTableDataSource<ListOrder>= null
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinnerService:NgxSpinnerService,
     private orderService:OrderService,
      private alertify:AlertifyService,
      private dialogService:DialogService
    ){
    super(spinnerService)
  }

 


  async ngOnInit() {

    await this.getOrders()
    
    
  }


  async getOrders(){
    this.showSpinner(SpinnerType.BallScale)
    let allOrders:{totalOrderCount:number, orders:ListOrder[]}= await this.orderService.getAllOrders(
      this.paginator ?  this.paginator.pageIndex : 0,
      this.paginator ?  this.paginator.pageSize : 5,
      ()=>{
      this.hideSpinner(SpinnerType.BallScale)
      this.alertify.message("Listeleme Basarili",{
        messageType:MessageType.success
      })

    }, errorMessage => {
      this.hideSpinner(SpinnerType.BallScale)
      this.alertify.message(errorMessage, {
        messageType : MessageType.error
      })
    })

    this.dataSource = new MatTableDataSource<ListOrder>(allOrders.orders)
    this.paginator.length = allOrders.totalOrderCount

  }


  async pageChange(){
    await this.getOrders()
  }

  showDetails(id:string){

    this.dialogService.openDialog({
      componentType:OrderDetailDialogsComponent,
      data: id,
     options: {
      width: "750px"
     }
    })

  }

}


