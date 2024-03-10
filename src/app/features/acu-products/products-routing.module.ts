import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { GetProductsComponent } from './products-pages/get-products/get-products.component';
import { ProductDetailsComponent } from './products-pages/product-details/product-details.component';
import { RouteResolver } from './services/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },

      {
        path: 'products',
        component: GetProductsComponent,
      },
      {
        path: 'productDetails/:id',
        component:ProductDetailsComponent
        ,
        resolve: {
          routeResolver: RouteResolver,
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
