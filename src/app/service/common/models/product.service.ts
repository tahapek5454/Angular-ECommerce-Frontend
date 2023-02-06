import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }


  create(createProduct:CreateProduct, successCallBack?:any,  errorCallBack?: (errorMessage: string) => void){

    this.httpClientService.post(
      {controller:"products"},
      createProduct
    ).subscribe(result => {
      successCallBack()
    }, (errorResponse : HttpErrorResponse) => {

      let error : Array<{key:string, value:Array<string>}>= errorResponse.error
      // kednimiz dondurdumuz error formatina gore tip donusturduk maksat . diyince metodlar gelsin
      let message = ""
      error.forEach((v, index) => {

        v.value.forEach((value, index) => {

          message+= `${value}<br>`
          
        });
        
      });

      errorCallBack(message)   
    })
    
  }
}
