import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/service/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinnerService:NgxSpinnerService, private productService:ProductService,
     private alertify: AlertifyService){
    super(spinnerService)
  }

  ngOnInit(): void {
    
  }

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter()


  create(name:HTMLInputElement, stock:HTMLInputElement, price:HTMLInputElement){

    this.showSpinner(SpinnerType.BallAtom)

    let createProduct:CreateProduct = new CreateProduct()
    createProduct.name = name.value
    createProduct.stock = parseInt(stock.value)
    createProduct.price = parseFloat(price.value)

    this.productService.create(
      createProduct,
      () => {

      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Product Added",{
        dismissOthers:true,
        messageType:MessageType.success
      })

      this.createdProduct.emit(createProduct)
    },
    (erroerMessage:string) => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message(erroerMessage,{
        dismissOthers:true,
        messageType:MessageType.error
      })
    }
       
    )
  }

}
