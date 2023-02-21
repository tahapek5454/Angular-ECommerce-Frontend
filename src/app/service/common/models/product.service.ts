import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/create_product';
import { ListProduct } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom  } from 'rxjs';
import { ListProductImage } from 'src/app/contracts/list_product_image';

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


  async delete(id:string){
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>(
      {controller:"products"},
      id
    )
    await firstValueFrom(deleteObservable)
  }

  async readImages(id:string,  successCallBack?:()=> void,):Promise<ListProductImage[]>{
    var getObservable:Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>(
      {
        action:"GetProductsImage",
        controller:"products"
      },
      id
    )
    
    var images = await firstValueFrom(getObservable)
    successCallBack()
    return images
  }

  async deleteImage(productId:string, imageId:string, successCallBack?:()=> void){
    const deleteObservable =  this.httpClientService.delete(
      {
        action:"DeleteProductImage",
        controller:"products",
        queryString:`imageId=${imageId}`

      },
      productId
    )
    await firstValueFrom(deleteObservable)
    successCallBack()
  }


  async changeShowCaseImage(imageId:string, productId:string, callBack?:()=>void){
    const observable: Observable<any> =  this.httpClientService.put(
      {
        controller:"products",
        action: "ChangeShowCase",
        queryString: `ImageId=${imageId}&ProductId=${productId}`
      },
      {}
    )

    await firstValueFrom(observable)

    callBack()
  }
}
