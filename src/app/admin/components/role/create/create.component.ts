import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { RoleService } from 'src/app/service/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinnerService:NgxSpinnerService, private roleService:RoleService,
     private alertify: AlertifyService){
    super(spinnerService)
  }

  ngOnInit(): void {
    
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter()


  create(name:HTMLInputElement){

    this.showSpinner(SpinnerType.BallAtom)

 
 

    this.roleService.create(
      name.value,
      () => {

      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Role Added",{
        dismissOthers:true,
        messageType:MessageType.success
      })

      this.createdRole.emit(name.value)
    }
       
    )
  }

 

}
