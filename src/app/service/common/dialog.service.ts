import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(
    private dialog:MatDialog
  ) { }

  openDialog(dialogParametesrs:Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParametesrs.componentType, {
      width: dialogParametesrs.options?.width,
      height: dialogParametesrs.options?.height,
      position: dialogParametesrs.options?.position,
      data: dialogParametesrs.data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == dialogParametesrs.data){
        dialogParametesrs.afterClosed()     
      }
    });
  }
}


export class DialogParameters{
  componentType : ComponentType<any>
  data:any
  afterClosed:()=> void
  options?:Partial<DialogOptions> = new DialogOptions()

}

export class DialogOptions{
  width?:string = '250px'
  height?:string
  position?:DialogPosition
}