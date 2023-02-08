import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { ProductService } from 'src/app/service/common/models/product.service';

declare var $:any


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'edit','delete'];
  dataSource:MatTableDataSource<ListProduct>= null
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinnerService:NgxSpinnerService, private productService:ProductService, private alertify:AlertifyService){
    super(spinnerService)
  }

 


  async ngOnInit() {

    await this.getProducts()
    
    
  }


  async getProducts(){
    this.showSpinner(SpinnerType.BallScale)
    let allProducts :{totalCount:number, products:ListProduct[]}= await this.productService.read(
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

    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products)
    this.paginator.length = allProducts.totalCount

  }


  async pageChange(){
    await this.getProducts()
  }

 
}


