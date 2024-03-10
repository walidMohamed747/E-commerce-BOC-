import { MarketPlace, Products, Quantity } from './../../models/products';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'app/core/services/http.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.scss'],
})
export class GetProductsComponent {
  private subscription: Subscription = new Subscription();
  hidden:boolean= true
  userID: number = Number(this.cookie.get('id'));
  categoris: any[] = [];
  selectedCategory: string;
  cardProducts: any[] = [];
  addButton: boolean = false;
  productsQty: Array<Quantity> = [];
  Qty: number = 0;
  marketResponse: MarketPlace;
  //#region search input
  @ViewChild('input') searchInput: ElementRef;

  searchInput$ = new Subject<string>();
  //#endregion
  searchString: string;
  //#region  Call Cards Data After Render Pagesize & pageindex  Pagination
  cards: Array<Products> = [];
  totalData: number;
  limit: number;
  skip: number;
  blockedUi: boolean = false;
  pageSizes = [5, 10, 25, 100];
  dataSource = new MatTableDataSource<Products>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.subscription.add(
      this.paginator.page
        .pipe(
          startWith({}),
          switchMap(() => {
            this.blockedUi = true;
            return this.__http.GetProducts(
              (this.limit = this.paginator.pageSize),
              (this.skip =
                this.paginator.pageSize * (this.paginator.pageIndex + 1) -
                this.paginator.pageSize),
              (this.searchString = this.searchInput.nativeElement.value)
            );
          }),
          map((product) => {
            if (product.products == null) return [];
            this.blockedUi = false;
            this.totalData = product.total;
            return product.products;
          })
        )
        .subscribe((product) => {
          this.cards = product;
          this.dataSource = new MatTableDataSource(this.cards);
        })
    );
  }
  //#endregion
  constructor(
    public route: Router,
    private __http: ProductsService,
    private http: HttpService,
    private httpClint: HttpClient,
    private messageService: MessageService,
    protected cookie: CookieService,
    private cd: ChangeDetectorRef
  ) {
    //#region searchFunc
    this.subscription.add(
      this.searchInput$
        .pipe(
          filter((res) => {
            return res !== null;
          }),
          distinctUntilChanged(),
          debounceTime(800),
          tap(() => (this.blockedUi = true)),
          switchMap((term) => {
            if (this.paginator.pageIndex === 0) {
              return this.__http
                .GetProducts(
                  (this.limit = 10),
                  (this.skip = 0),
                  (this.searchString = term)
                )
                .pipe(
                  catchError(() => of([])), // empty list on error
                  map((res) => {
                    this.blockedUi = false;
                    this.totalData = res.total;
                    return res.products;
                  })
                );
            } else {
              return of(term);
            }
          })
        )
        .subscribe((res) => {
          if (this.paginator.pageIndex === 0) {
            this.blockedUi = false;
            this.cards = res;
            this.dataSource = new MatTableDataSource(this.cards);
          } else {
            this.paginator.firstPage();
          }
        })
    );
    // #endregion
  }
  ngOnInit(): void {
    this.getCategories();
  }
  // Filter By Category
  filterCategory() {
    this.blockedUi = true;
    let value = this.selectedCategory;
    this.__http.filterProductsCategory(value).subscribe((res: any) => {
      this.blockedUi = false;
      this.cards = res.products;
      this.totalData = res.total;
      this.dataSource = new MatTableDataSource(this.cards);
    });
  }
  // Get Categories DropDown
  getCategories() {
    this.subscription.add(
      this.__http.GetCategories().subscribe((res) => {
        this.categoris = res;
      })
    );
  }
  // Add To Card
  addProduct(product: Products) {
    this.blockedUi = true;

    this.productsQty.push({
      id: product.id,
      quantity: 1,
    });
    this.__http.AddToCard(this.userID, this.productsQty).subscribe((res) => {
      this.marketResponse = res;
      this.hidden=false
      this.Qty = this.marketResponse.totalQuantity;
      localStorage.setItem('qty', JSON.stringify(this.Qty));
      if (res.products.length !== 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' Product added successfully to your card!',
          life: 3000,
        });
        this.blockedUi = false;
      } else {
        (error) => {
          console.log('error :>> ', error);
        };
      }
    });
  }
  // Get Card Details
  showDetails(items: Products) {
    this.blockedUi = true;

    this.route.navigateByUrl(`products/productDetails/${items.id}`);
  }

  // unsubscribe requests
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
