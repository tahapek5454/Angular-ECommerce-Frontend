import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListRole } from 'src/app/contracts/roles/List_Role';
import { AlertifyService } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { AuthorizationEndpointService } from 'src/app/service/common/models/authorization-endpoint.service';
import { RoleService } from 'src/app/service/common/models/role.service';
import { UserService } from 'src/app/service/common/models/user.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit, OnDestroy {
  roles:{datas: ListRole[], totalCount: number} 
  assignedRoles:string[]
  listRoles : {name: string, selected:boolean}[]
  constructor(
    dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService,
    private alertify: AlertifyService,
    private roleService:RoleService,
    private userService:UserService,
    private autorizationEndpointService:AuthorizationEndpointService

  ){
    super(dialogRef)
  }
  ngOnDestroy(): void {
   
  }
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom)

    
    this.roles = await  this.roleService.getRoles(-1, -1)


    this.assignedRoles = (await this.userService.getRolesToUser(this.data,()=>{
      this.spinner.hide(SpinnerType.BallAtom)
    }))

    this.listRoles = this.roles.datas.map((r:any) =>{
      return{
        name: r.name,
        selected: this.assignedRoles.includes(r.name)
      }
    })
   
  }



  assignRole(rolesComponent: MatSelectionList) {

    
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._elementRef.nativeElement.innerText)
    this.spinner.show(SpinnerType.BallAtom)
    this.userService.assignRoleToUser(
      this.data,
      roles,
      ()=>{

          this.spinner.hide(SpinnerType.BallAtom)


      }

    )
    
  }

}

