import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';
import { AuthorizeMenuModule } from './authorize-menu/authorize-menu.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderModule,
    ProductsModule,
    DashboardModule,
    CustomerModule,
    AuthorizeMenuModule
  ],
  

})
export class ComponentsModule { }
