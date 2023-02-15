import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CreateUser } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/service/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/service/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  frm: FormGroup

  constructor(
    private formBuilder:FormBuilder,
     private userService:UserService,
     private toastrService:CustomToastrService
     ) {
   
    
  }
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      surname:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
        Validators.email
      ]],
      password:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      repassword:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("repassword").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }


  get component(){
    return this.frm.controls
  }


  submitted:boolean = false

  async onSubmit(data:User){

    this.submitted = true
    if(this.frm.invalid)
      return
    
    var result:CreateUser = await this.userService.create(data)

    var metin = result.message

    if(result.success){
        this.toastrService.message(metin,"Kullanıcı Ekleme",{
          messageType : ToastrMessageType.success,
          position: ToastrPosition.BottomRight
        })
    }else{
      this.toastrService.message(metin,"Kullanıcı Ekleme",{
        messageType : ToastrMessageType.error,
        position: ToastrPosition.BottomRight
      }) 
    }
  }

}
