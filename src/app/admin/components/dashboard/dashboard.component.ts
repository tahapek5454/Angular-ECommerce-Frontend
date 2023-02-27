import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/ownConstant/hub-urls';
import { ReceiveFunction } from 'src/app/ownConstant/receive-funtion';
import { AlertifyService, MessageType, Position } from 'src/app/service/admin/alertify.service';
import { SignalRService } from 'src/app/service/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private aletify: AlertifyService,spinnerService: NgxSpinnerService, private signalRService:SignalRService){
    super(spinnerService)

    //signalRService.start(HubUrls.ProductHub)
    // signalRService.start(HubUrls.OrderHub)
  }

  ngOnInit(): void {

    this.signalRService.on(HubUrls.ProductHub,ReceiveFunction.ProductAddedMessageReceiveFunction, (message)=>{

      this.aletify.message(message,{
        messageType: MessageType.warning,
        position: Position.top_right
      })

    })


    this.signalRService.on(HubUrls.OrderHub,ReceiveFunction.OrderAddedMessageReceiveFunction, (message)=>{

      this.aletify.message(message,{
        messageType: MessageType.warning,
        position: Position.top_right
      })

    })
  
  }

}
