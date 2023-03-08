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
import { BaseDialog } from '../base/base-dialog';
declare var $:any
@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit, OnDestroy {
  roles:{datas: ListRole[], totalCount: number} 
  assignedRoles:string[]
  listRoles : {name: string, selected:boolean}[]
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService,
    private alertify: AlertifyService,
    private roleService:RoleService,
    private autorizationEndpointService:AuthorizationEndpointService

  ){
    super(dialogRef)
  }
  ngOnDestroy(): void {
   
  }
  async ngOnInit() {

    this.roles = await  this.roleService.getRoles(-1, -1)
    this.assignedRoles = (await this.autorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName)).roles

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
    this.autorizationEndpointService.assignRoleEndpoint(
      roles,
      this.data.code,
      this.data.menuName,
      ()=>{

          this.spinner.hide(SpinnerType.BallAtom)


      }

    )
    
  }

}

export enum AuthorizeMenuState {
  Yes,
  No
}