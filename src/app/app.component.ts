import { Component } from '@angular/core';
import { AuthService } from './service/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './service/ui/custom-toastr.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceFrontend';

  constructor(private mytoastrService:CustomToastrService, public authService:AuthService){
    authService.identityCheck()
  }


  signOut(){
    this.mytoastrService.message("Oturup Kapatıldı", "Oturup Kapama",{
      messageType: ToastrMessageType.warning,
      position: ToastrPosition.BottomRight
    })
    localStorage.removeItem("accessToken")
    this.authService.identityCheck()
  }
}

