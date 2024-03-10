import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ProductsService } from './products.service';
export const RouteResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productservice: ProductsService = inject(ProductsService)
): Observable<{}> => productservice.GetSingleProduct(+route.paramMap?.get('id'));
