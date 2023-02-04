import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{


  constructor(spinnerService: NgxSpinnerService){
    super(spinnerService)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Square)
  }

}
