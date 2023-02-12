import { Component, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/service/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-select-products-image-dialog',
  templateUrl: './select-products-image-dialog.component.html',
  styleUrls: ['./select-products-image-dialog.component.scss']
})
export class SelectProductsImageDialogComponent extends BaseDialog<SelectProductsImageDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<SelectProductsImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductsImageState | string,
  ){
    super(dialogRef)
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
