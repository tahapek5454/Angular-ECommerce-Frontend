import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from 'src/app/contracts/application-configurations/menu';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }



  async getAuthorizeDefinitionEndPoints(){
    const obsevable : Observable<Menu[]> = this.httpClientService.get<Menu[]>({

      controller:"ApplicationServices",

    })


   return  await firstValueFrom(obsevable)  
    
  }
}
