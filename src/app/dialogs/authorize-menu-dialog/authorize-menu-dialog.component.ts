import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { BaseDialog } from '../base/base-dialog';
declare var $:any
@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService,
    private alertify: AlertifyService

  ){
    super(dialogRef)
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}