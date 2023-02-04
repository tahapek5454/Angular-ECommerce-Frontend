import { Injectable } from '@angular/core';
declare var alertify:any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message (message:string, options:Partial<AlertifyOptions>){

    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay);
    // direkt ilgili metodu kendi yapisi indexleyerek cekiyor
    const msg = alertify[options.messageType](message)

    if(options.dismissOthers) msg.dismissOthers(); 
  }

  dismissAll(){
    alertify.dismissAll()
  }
}

export class AlertifyOptions{
  messageType: MessageType
  position:Position = Position.bottom_right
  delay:Number = 3
  dismissOthers :boolean = false
}

export enum MessageType
{
  warning = "warning",
  success = "success",
  notify = "notify",
  message = "message",
  error = "error",
  dismissAll = "dismissAll"
}

export enum Position{
  bottom_left = "bottom-left",
  bottom_center = "bottom-center",
  bottom_right = "bottom-right",
  top_left = "top-left",
  top_center = "top-center",
  top_right = "top-right"
}
