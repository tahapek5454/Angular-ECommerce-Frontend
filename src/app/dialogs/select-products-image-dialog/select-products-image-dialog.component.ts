import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { AlertifyService, MessageType, Position } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/service/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $:any

@Component({
  selector: 'app-select-products-image-dialog',
  templateUrl: './select-products-image-dialog.component.html',
  styleUrls: ['./select-products-image-dialog.component.scss']
})
export class SelectProductsImageDialogComponent extends BaseDialog<SelectProductsImageDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<SelectProductsImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductsImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService,
    private alertify: AlertifyService

  ){
    super(dialogRef)
  }


  images: ListProductImage[]

  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.Square)
    this.images = await this.productService.readImages(this.data as string, ()=>{
      this.spinner.hide(SpinnerType.Square)
    })
    
  }

  showCase(imageId:string){
    this.spinner.show(SpinnerType.BallSpin)
    this.productService.changeShowCaseImage(imageId, this.data as string, ()=>{

      this.spinner.hide(SpinnerType.BallSpin)

      this.alertify.message("Urun Kapak Resmi Basariyla Secildi",{
        position:Position.bottom_right,
        messageType:MessageType.success
      })




    })


  }

  async deleteImage(imageId:string, event:any){


    this.dialogService.openDialog(
      {
        componentType: DeleteDialogComponent,
        data:DeleteState.Yes,
        afterClosed: async ()=>{

          this.spinner.show(SpinnerType.BallAtom)

          await this.productService.deleteImage(this.data as string, imageId, ()=>{this.spinner.hide(SpinnerType.BallAtom)})

          var card = $(event.srcElement).parent().parent()
          card.fadeOut(500)

        }
      }
    )

    
  }

  @Output() options : Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Resmi seçin veya sürükleyin",
    isAdminPage:true,
    queryString:`id=${this.data}`
  }
  

}

export enum SelectProductsImageState{
  Close,
}
