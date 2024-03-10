import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = environment.url;

  constructor(
    private http: HttpClient,
    protected cookie: CookieService,
    public router: Router
  ) {}

  GetProducts(
    limit: number,
    skip: number,
    searchText: string
  ): Observable<any> {
    return this.http.get(
      `${this.url}/products/search?q=${searchText}&limit=${limit}&skip=${skip} `
    );
  }

  // Get Categories
  GetCategories(): Observable<any> {
    return this.http.get(`${this.url}/products/categories`);
  }
  // filter Categories
  filterProductsCategory(keyword: string): Observable<any> {
    return this.http.get(`${this.url}/products/category/` + keyword);
  }

  // Add To Card
  AddToCard(
    userId: number,
    products: { id: number; quantity: number }[]
  ): Observable<any> {
    const body = {
      userId,
      products,
    };

    return this.http.post(`${this.url}/carts/add`, body);
  }

  // Get Single product
  GetSingleProduct(id: number): Observable<any> {
    return this.http.get(`${this.url}/products/` + id);
  }
}
