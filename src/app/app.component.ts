import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './service/ui/custom-toastr.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceFrontend';

  constructor(private mytoastrService:CustomToastrService){
    mytoastrService.message("taha","mehaba", {
      messageType: ToastrMessageType.info,
      position: ToastrPosition.BottomRight
    })
  }
}

