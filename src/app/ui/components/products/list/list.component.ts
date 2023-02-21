import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/service/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{


  /**
   *
   */
  constructor(
    spinner:NgxSpinnerService,
     private productService: ProductService,
     private activatedRoute: ActivatedRoute
     ) {
    super(spinner);

  }

  currentPageNo : number
  totalProductCount : number
  totalPageCount : number
  pageSize: number = 12
  pageList: number[] = []

  products: ListProduct[]
  ngOnInit() {

    this.activatedRoute.params.subscribe(async params =>{


      this.currentPageNo = parseInt(params["pageNo"] ?? 1)

      const data = await this.productService.read(
        this.currentPageNo -1 ,
        this.pageSize,
        ()=>{},
        (error ="hata") => {}
      )
      
      this.products = data.products
      this.totalProductCount = data.totalCount
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize)

      this.pageList = []

   

      if(this.products.length == 0){
        this.pageList = []
      }else{

        if (this.currentPageNo -1 <= 0){

          if( this.totalPageCount <= 3){
  
            for(let i =1; i<= this.totalPageCount; i++){
              this.pageList.push(i)
            }
  
          }else{
  
            for(let i =1; i<= this.currentPageNo+2; i++){
              this.pageList.push(i)
            }
  
          }
          
        }
        else if(this.currentPageNo + 1 > this.totalPageCount){
  
          if(this.totalPageCount -2 <=0){
            for(let i = 1 ; i <= this.totalPageCount; i++){
              this.pageList.push(i)
    
            }
            
          }else{
  
            for(let i = this.totalPageCount - 2 ; i <= this.totalPageCount; i++){
              this.pageList.push(i)
    
            }
  
          }
  
          
  
        }else{
  
          for(let i = this.currentPageNo - 1 ; i <= this.currentPageNo + 1; i++){
            this.pageList.push(i)
  
          }
  
        }
  

      }

    
    })

   
  }

}
