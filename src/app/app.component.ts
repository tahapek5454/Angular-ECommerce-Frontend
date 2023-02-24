import { Component, ViewChild } from '@angular/core';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './service/common/auth.service';
import { ComponentName, DynamicLoadComponentService } from './service/common/dynamic-load-component.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './service/ui/custom-toastr.service';
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceFrontend';


  @ViewChild(DynamicLoadComponentDirective, {static: true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective

  constructor(private mytoastrService:CustomToastrService, public authService:AuthService,
    private dynamicLoadComponentService: DynamicLoadComponentService){
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

  async loadComponent(){

    await this.dynamicLoadComponentService.loadComponent(ComponentName.BasketComponent, 
        this.dynamicLoadComponentDirective.viewContainerRef
        
      )


  }
}

