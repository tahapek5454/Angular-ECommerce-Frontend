import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType } from '../../ui/custom-toastr.service';
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
    private customToastrService:CustomToastrService
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

    this.httpClientService.post(
      {
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({"responseType": "blob"})
      },
      fileData 
    ).subscribe(result => {

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

export class FileUploadOptions{
  controller?:string
  action?:string
  queryString?:string
  explanation?:string
  accept?:string
  isAdminPage?:boolean = false

}
