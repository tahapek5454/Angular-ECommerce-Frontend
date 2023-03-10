import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { CreateBasketItem } from 'src/app/contracts/baskets/create_basket_item';
import { ListProduct } from 'src/app/contracts/list_product';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { BasketService } from 'src/app/service/common/models/basket.service';
import { FileService } from 'src/app/service/common/models/file.service';
import { ProductService } from 'src/app/service/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';

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
     private activatedRoute: ActivatedRoute,
     private fileService: FileService,
     private basketService: BasketService,
     private taostr: CustomToastrService
     ) {
    super(spinner);

  }

  currentPageNo : number
  totalProductCount : number
  totalPageCount : number
  pageSize: number = 12
  pageList: number[] = []
  baseUrl: BaseUrl
  

  products: ListProduct[]
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.params.subscribe(async params =>{


      this.currentPageNo = parseInt(params["pageNo"] ?? 1)

      const data = await this.productService.read(
        this.currentPageNo -1 ,
        this.pageSize,
        ()=>{},
        (error ="hata") => {}
      )
      
      this.products = data.products

      this.products = this.products.map<ListProduct>(p => {
        const listProduct: ListProduct = {
          id: p.id,
          createDate: p.createDate,
          imagePath: "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updateDate: p.updateDate,
          productImageFiles: p.productImageFiles
        };

        // p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",

        if(p.productImageFiles.length != null ){
          if(p.productImageFiles.find(p => p.showcase) != null){
            listProduct.imagePath =  p.productImageFiles.find(p => p.showcase).path
          }
        }
        return listProduct;
      });
        
      // this.products.forEach((product, i) => {
        
      //   let p = {
      //     name: product.name,
      //     id : product.id,
      //     price: product.price,
      //     stock : product.stock,
      //     updateDate : product.updateDate,
      //     createDate: product.createDate,
      //     imagePath: product.productImageFiles.length ? product.productImageFiles[0].path : ""
      //   }


      //   debugger
      //   console.log(product.productImageFiles)
      //   let a : ListProductImage [] =  product.productImageFiles
      //   a.forEach(element => {

      //     console.log("---")
      //     console.log(element)
      //     console.log(element.path)
      //     console.log(element.showcase)
      //     console.log(element.fileName)
          
      //   });
      //   console.log(product.productImageFiles[3].showcase)

      // })

      


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



  async addToBasket(product: ListProduct){

   

    this.showSpinner(SpinnerType.Square)

    let basketItem: CreateBasketItem = new CreateBasketItem()
    basketItem.productId = product.id
    basketItem.quantity = 1

   

    await this.basketService.add(basketItem)

    this.hideSpinner(SpinnerType.Square)

    this.taostr.message("Urun Sepete Eklenmist", "Sepet Islemleri", {
      messageType:ToastrMessageType.success,
      position:ToastrPosition.BottomLeft
    })


  }




}
