import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService:HttpClientService,
    private aletift:AlertifyService,
    private customToastrService:CustomToastrService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinnerService: NgxSpinnerService
    ){}

  public files: NgxFileDropEntry[];

  @Input() options:Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;
    const fileData :FormData = new FormData()

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name, _file, file.relativePath)
      })
    }


    this.dialogService.openDialog(
      {
        componentType: FileUploadDialogComponent,
        data: FileUploadDialogState.Yes,
        afterClosed: ()=>{
          this.spinnerService.show(SpinnerType.BallAtom)
          this.httpClientService.post(
            {
              controller: this.options.controller,
              action: this.options.action,
              queryString: this.options.queryString,
              headers: new HttpHeaders({"responseType": "blob"})
            },
            fileData 
          ).subscribe(result => {

            this.spinnerService.hide(SpinnerType.BallAtom)
            if(this.options.isAdminPage){
      
              this.aletift.message(
                "Dosyalar Basariyla Yuklendi",
                {messageType: MessageType.success})
      
            }else{
      
              this.customToastrService.message(
                "Dosyalar Basariyla Yuklendi",
                 "Basarili",
                 {messageType: ToastrMessageType.success})
      
            }
      
          }, (errorResponse:HttpErrorResponse) =>{

            this.spinnerService.hide(SpinnerType.BallAtom)

      
            if(this.options.isAdminPage){
      
              this.aletift.message(
                errorResponse.message,
                {messageType: MessageType.error})
      
            }else{
      
              this.customToastrService.message(
                errorResponse.message,
                 "Hata",
                 {messageType: ToastrMessageType.error})
      
            }
      
          })  
        }
        
      }
    )

    
  }
}

export class FileUploadOptions{
  controller?:string
  action?:string
  queryString?:string
  explanation?:string
  accept?:string
  isAdminPage?:boolean = false

}
