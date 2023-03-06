import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list_product';
import { ListRole } from 'src/app/contracts/roles/List_Role';
import { SelectProductsImageDialogComponent } from 'src/app/dialogs/select-products-image-dialog/select-products-image-dialog.component';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { RoleService } from 'src/app/service/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  displayedColumns: string[] = ['name','edit','delete'];
  dataSource:MatTableDataSource<ListRole>= null
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(spinnerService:NgxSpinnerService,
     private roleService:RoleService,
      private alertify:AlertifyService,
      private dialogService:DialogService){
    super(spinnerService)
  }

 


  async ngOnInit() {

    await this.getRoles()
    
    
  }


  async getRoles(){
    this.showSpinner(SpinnerType.BallScale)
    let allRoles :{datas: ListRole[], totalCount:number}= await this.roleService.getRoles(
      this.paginator ?  this.paginator.pageIndex : 0,
      this.paginator ?  this.paginator.pageSize : 5,
      ()=>{
      this.hideSpinner(SpinnerType.BallScale)
      this.alertify.message("Listeleme Basarili",{
        messageType:MessageType.success
      })

    })

   
    this.dataSource = new MatTableDataSource<ListRole>(allRoles.datas)
    this.paginator.length = allRoles.totalCount

  }


  async pageChange(){
    await this.getRoles()
  }


  

}
