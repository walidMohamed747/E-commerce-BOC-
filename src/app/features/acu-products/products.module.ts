import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { GetProductsComponent } from './products-pages/get-products/get-products.component';
import { ProductsService } from './services/products.service';
import { SharedModule } from 'app/shared/shared.module';
import { ProductDetailsComponent } from './products-pages/product-details/product-details.component';


@NgModule({
  declarations: [
    ProductsComponent,
    GetProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,

  ],

})
export class ProductsModule { }
