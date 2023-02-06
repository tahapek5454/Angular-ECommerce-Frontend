import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/service/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor(spinnerService:NgxSpinnerService, private httpClientService:HttpClientService){
    super(spinnerService)
  }

  ngOnInit(): void {

   
  }

  @ViewChild(ListComponent) listComponent:ListComponent

  createdProduct(createdProduct:CreateProduct){

    this.listComponent.getProducts()

  }

}
