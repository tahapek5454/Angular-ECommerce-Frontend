import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListUser } from 'src/app/contracts/users/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { UserService } from 'src/app/service/common/models/user.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  displayedColumns: string[] = ['name','surname','userName','email','twoFactorEnabled','role','delete'];
  dataSource:MatTableDataSource<ListUser>= null
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinnerService:NgxSpinnerService,
     private userService:UserService,
      private alertify:AlertifyService,
      private dialogService:DialogService
    ){
    super(spinnerService)
  }

 


  async ngOnInit() {

    await this.getUsers()
    
    
  }


  async getUsers(){
    this.showSpinner(SpinnerType.BallScale)
    let allUsers:{totalUsersCount:number, users:ListUser[]}= await this.userService.getAllUsers(
      this.paginator ?  this.paginator.pageIndex : 0,
      this.paginator ?  this.paginator.pageSize : 5,
      ()=>{
      this.hideSpinner(SpinnerType.BallScale)
      this.alertify.message("Listeleme Basarili",{
        messageType:MessageType.success
      })

    }, errorMessage => {
      this.hideSpinner(SpinnerType.BallScale)
      this.alertify.message(errorMessage, {
        messageType : MessageType.error
      })
    })

    this.dataSource = new MatTableDataSource<ListUser>(allUsers.users)
    this.paginator.length = allUsers.totalUsersCount

  }


  async pageChange(){
    await this.getUsers()
  }


  assignRole(id:string){
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      options:{
        width:"750px"
      },
      afterClosed: ()=>{
        
      }
    })
  }

  

}
