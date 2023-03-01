import { Component , OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

import { UserAuthService } from 'src/app/service/common/models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent implements OnInit{


  /**
   *
   */
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private toastr:CustomToastrService) {
    super(spinner);

  }
  ngOnInit(): void {
    
  }

  passwordReset(email:string){
    this.showSpinner(SpinnerType.BallAtom)
     this.userAuthService.passwordReset(email, ()=>{

      this.toastr.message("Sifre Degistirme Talebi Basarili Bir Sekilde Gerceklestirilmistir",
      "Sifre Degistirme Talebi",{
        messageType:ToastrMessageType.info,
        position:ToastrPosition.TopRight
      })

      this.hideSpinner(SpinnerType.BallAtom)

    })
  }

}
