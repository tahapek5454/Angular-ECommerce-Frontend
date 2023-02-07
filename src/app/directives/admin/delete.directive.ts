import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/service/common/models/product.service';
declare var $:any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private elemet:ElementRef,
    private renderer:Renderer2,
    private productService: ProductService,
    private spinner:NgxSpinnerService) { 

      const img = renderer.createElement("img")
      img.setAttribute("src", "../../../../../assets/cross.png")
      img.setAttribute("style", "cursor:pointer;")
      img.width = 25
      img.height = 25

      renderer.appendChild(elemet.nativeElement, img)
    }


    @Input() id:string
    @Output() callBack: EventEmitter<any> = new EventEmitter()

    @HostListener("click")
    async onClick(){     
      const td: HTMLTableCellElement = this.elemet.nativeElement
      await this.productService.delete(this.id)
      this.spinner.show(SpinnerType.BallSpin)
      $(td.parentElement).fadeOut(1500, () => {
        this.spinner.hide(SpinnerType.BallSpin)
        this.callBack.emit()
      })

    }

}
