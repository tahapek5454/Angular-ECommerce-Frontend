import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService,
    private router:Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError(error => {
      
      switch(error.status){
        case HttpStatusCode.Unauthorized:

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state)=> {

            if(!state){

              const url = this.router.url

          if(url == "/products"){

            this.toastrService.message(
             "Sepete Ürün Eklemek İçin Oturum Açmalısınız",
              "Oturum Açma İsteği",
              {
                messageType:ToastrMessageType.info,
                position:ToastrPosition.BottomRight
              }
            )




          }else{

            this.toastrService.message(
              "Bu islemi yapmaya yetkiniz yoktur",
              "Hata",
              {
                messageType:ToastrMessageType.error,
                position:ToastrPosition.BottomRight
              }
            )

          }

            }

          })
          .then(data =>{
            
          })
          break

        case HttpStatusCode.InternalServerError:
          this.toastrService.message(
            "Sunucuya Erişilemiyor - "+ error.error?.Message,
            "Hata",
            {
              messageType:ToastrMessageType.error,
              position:ToastrPosition.BottomRight
            }
          )
          break

        case HttpStatusCode.BadRequest:
          this.toastrService.message(
            "Geceriz istek",
            "Hata",
            {
              messageType:ToastrMessageType.error,
              position:ToastrPosition.BottomRight
            }
          )
        break

        case HttpStatusCode.NotFound:
          this.toastrService.message(
            "Istek Bulunamadi",
            "Hata",
            {
              messageType:ToastrMessageType.error,
              position:ToastrPosition.BottomRight
            }
          )
          break

        default:
          this.toastrService.message(
            "Beklenmeyen bir hatayla karsilasildi",
            "Hata",
            {
              messageType:ToastrMessageType.error,
              position:ToastrPosition.BottomRight
            }
          )

          break
          

      }

      return of(error)

    }))
  }
}
