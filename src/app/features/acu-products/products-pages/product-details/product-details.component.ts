import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'app/core/services/http.service';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';
import { Products } from '../../models/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  private subscription: Subscription = new Subscription();
  blockedUi: boolean = false;
  cardDetails: Products;

  constructor(
    private http: HttpService,
    public router: Router,
    public route: ActivatedRoute,
    private __http: ProductsService
  ) {

    // Listen To data from one card
    this.route.data.subscribe((data) => {
      this.cardDetails = data.routeResolver;
    });
  }
}
