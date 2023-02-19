import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private toastrService: CustomToastrService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError(error => {
      
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.toastrService.message(
            "Bu islemi yapmaya yetkiniz yoktur",
            "Hata",
            {
              messageType:ToastrMessageType.error,
              position:ToastrPosition.BottomRight
            }
          )
          break

        case HttpStatusCode.InternalServerError:
          this.toastrService.message(
            "Sunucuya Erişilemiyor",
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
