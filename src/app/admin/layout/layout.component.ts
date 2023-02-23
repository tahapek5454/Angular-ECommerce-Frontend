import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType } from 'src/app/service/admin/alertify.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  constructor(private alertify:AlertifyService){}

  ngOnInit(): void {

    
  
  }

}
