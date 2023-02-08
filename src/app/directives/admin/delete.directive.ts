import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
import { DialogService } from 'src/app/service/common/dialog.service';
import { HttpClientService } from 'src/app/service/common/http-client.service';

declare var $:any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private elemet:ElementRef,
    private renderer:Renderer2,
    private httpClientService: HttpClientService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertify:AlertifyService,
    private dialogService:DialogService) { 

      const img = renderer.createElement("img")
      img.setAttribute("src", "../../../../../assets/cross.png")
      img.setAttribute("style", "cursor:pointer;")
      img.width = 25
      img.height = 25

      renderer.appendChild(elemet.nativeElement, img)
    }


    @Input() id:string
    @Input() controller:string
    @Output() callBack: EventEmitter<any> = new EventEmitter()

    @HostListener("click")
    async onClick(){  
    
      this.dialogService.openDialog(
        {
          afterClosed: async ()=>{
            const td: HTMLTableCellElement = this.elemet.nativeElement
            this.httpClientService.delete(
              {controller:this.controller},
              this.id).subscribe(data => {
                this.spinner.show(SpinnerType.BallSpin)
                $(td.parentElement).fadeOut(1500, () => {
                  this.spinner.hide(SpinnerType.BallSpin)
                  this.callBack.emit()
                  this.alertify.message("Silme Islmei Basarili",{
                    messageType: MessageType.success
                  })
                })
              }, (errorResponse:HttpErrorResponse) => {
                this.spinner.hide(SpinnerType.BallSpin)
                this.alertify.message(errorResponse.message,{
                  messageType: MessageType.error
                })
              })     
          },

          componentType: DeleteDialogComponent,
          data: DeleteState.Yes 
        }
      )
      
    }

}
