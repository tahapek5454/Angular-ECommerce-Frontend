import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ResetPasswordState } from 'src/app/contracts/tokens/resetPasswordTokenState/resetPasswordState';
import { UserAuthService } from 'src/app/service/common/models/user-auth.service';
import { UserService } from 'src/app/service/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

  /**
   *
   */
  constructor(spinner: NgxSpinnerService, private userAuthService:UserAuthService,
    private activatedRoute: ActivatedRoute, private toastr:CustomToastrService, 
    private userService:UserService,
    private router:Router) {
    super(spinner);

  }
  resetPasswordState:ResetPasswordState
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom)

    this.activatedRoute.params.subscribe({
      next: async params =>{
        const userId: string = params["userId"]
        const resetToken:string = params["resetToken"]

      this.resetPasswordState = await this.userAuthService.verifyResetToken(resetToken, userId, ()=>{
          
          this.hideSpinner(SpinnerType.BallAtom)
          
          
        })
      }
    })

    
   
  }

  updatePassword(password:string , passwordConfirm:string){

    this.showSpinner(SpinnerType.BallAtom)

    if(password != passwordConfirm){
      this.toastr.message("Girilen Sifreler Uyumlu Degil", "Sifre Uyum Hatasi",{
        messageType:ToastrMessageType.error,
        position:ToastrPosition.BottomRight
       
      })

      this.hideSpinner(SpinnerType.BallAtom)
    }else{



      this.activatedRoute.params.subscribe({
        next: async params =>{
          const userId: string = params["userId"]
          const resetToken:string = params["resetToken"]
  
          
          await this.userService.updatePassword(userId,
            resetToken,
             password,
              passwordConfirm,

              ()=>{
                this.hideSpinner(SpinnerType.BallAtom)
                this.toastr.message("Sifre Basarili Bir Sekilde Degisti", "Sifre Degistirme",{
                  messageType:ToastrMessageType.success,
                  position:ToastrPosition.BottomLeft
                })

                this.router.navigate(["/login"])
              },

              error => {
                this.hideSpinner(SpinnerType.BallAtom)
                this.toastr.message("Sifre Degistirilemedi", "Sifre Degistirme",{
                  messageType:ToastrMessageType.error,
                  position:ToastrPosition.BottomLeft
                })
              }
            
           
            
            )

        }
      })



    }

  }



}
