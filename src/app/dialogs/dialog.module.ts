import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductsImageDialogComponent } from './select-products-image-dialog/select-products-image-dialog.component';
import { FileUploadModule } from '../service/common/file-upload/file-upload.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductsImageDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule 
  ]
})
export class DialogModule { }
