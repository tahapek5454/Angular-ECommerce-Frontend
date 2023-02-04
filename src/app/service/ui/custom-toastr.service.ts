import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }

  message(message:string, title:string, options:Partial<ToastrOptions>){

    this.toastr[options.messageType](message, title, {
      positionClass : options.position
    })

  }
}

export class ToastrOptions{

  messageType:ToastrMessageType
  position:ToastrPosition

}


export enum ToastrMessageType{
  success = "success",
  info = "info",
  warning = "warning",
  error = "error"

}

export enum ToastrPosition{
  BottomRight = "toast-bottom-right",
  TopRight = "toast-top-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left"
}
