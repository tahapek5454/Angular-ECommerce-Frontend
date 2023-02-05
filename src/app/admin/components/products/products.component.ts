import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/service/common/http-client.service';

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

    // this.showSpinner(SpinnerType.Square)
    // this.httpClientService.get({
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.log(data))

    // this.httpClientService.post({
    //   controller:"products"
    // },
    // {
    //   name:"kalem",
    //   stock:"20",
    //   price:"15"
    // }).subscribe()

    // this.httpClientService.put(
    //   {
    //     controller:"products"
    //   },
    //   {
    //     id:"f73471e5-5d0f-493a-9873-cf21d7e612e0",
    //     name:"renk",
    //     stock:1,
    //     price:36
    //   }
    // ).subscribe()

    // this.httpClientService.delete(
    //   {
    //     controller:"products"
    //   },
    //   "f73471e5-5d0f-493a-9873-cf21d7e612e0"
    // ).subscribe()

  }

}
