import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create_product';
import { ListProduct } from 'src/app/contracts/list_product';
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

  async read(page:number = 0,
    size:number=5,
     successCallBack?:()=> void,
       errorCallBack?: (errorMessage: string) => void)
  : Promise<{totalCount:number, products:ListProduct[]}>{
    const promiseDate: Promise<{totalCount:number, products:ListProduct[]}> = this.httpClientService.get<{totalCount:number, products:ListProduct[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}` 
    }).toPromise();

    promiseDate.then(d => successCallBack())
      .catch((errorResponse:HttpErrorResponse) => errorCallBack(errorResponse.message))

      return await  promiseDate
  }

  

}
