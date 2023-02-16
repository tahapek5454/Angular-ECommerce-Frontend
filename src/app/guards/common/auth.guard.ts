import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import {  _isAuthenticated } from 'src/app/service/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private jwtHelper:JwtHelperService, private router:Router,
     private toastrService:CustomToastrService,
     private spinner: NgxSpinnerService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      this.spinner.show(SpinnerType.Square)
      
    

      if(!_isAuthenticated){

        this.toastrService.message("Giriş Yapa Yönlendiriliyorsunuz", "Yönlendirme",{
          messageType: ToastrMessageType.info,
          position : ToastrPosition.BottomRight
        })

        this.router.navigate(["login"], {queryParams: {returnUrl: state.url}})

      }



       
      this.spinner.hide(SpinnerType.Square)
    

    return true;
  }
  
}
