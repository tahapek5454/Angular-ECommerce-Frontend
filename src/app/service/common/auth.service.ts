import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }


  identityCheck(){

    const token : string = localStorage.getItem("accessToken")


    // const decodeToken = this.jwtHelper.decodeToken(token)
    // const expirationDate:Date = this.jwtHelper.getTokenExpirationDate(token)
    let  isExpire:boolean ;

    try{

      isExpire =  this.jwtHelper.isTokenExpired(token)

    }catch{
      isExpire = true


    }

    _isAuthenticated = token!= null && !isExpire
  }


  get isAuthenticated ():boolean{
      return _isAuthenticated
  } 

}

export let _isAuthenticated: boolean
