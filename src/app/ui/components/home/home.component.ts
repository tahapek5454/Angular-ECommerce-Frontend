import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(spinnerService: NgxSpinnerService){
    super(spinnerService)
  }

  ngOnInit(): void {
    
  }

}
