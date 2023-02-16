import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
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
      const token : string = localStorage.getItem("accessToken")


      // const decodeToken = this.jwtHelper.decodeToken(token)
      // const expirationDate:Date = this.jwtHelper.getTokenExpirationDate(token)
      let  isExpire:boolean ;

      try{

        isExpire =  this.jwtHelper.isTokenExpired(token)

      }catch{
        isExpire = true


      }

    

      if(!token || isExpire){

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
