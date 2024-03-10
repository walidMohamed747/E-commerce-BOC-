import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
let status;
@Injectable({
  providedIn: 'root',
})
export class IsLogged implements CanActivate {
  constructor(private route: Router, private auth: HttpService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return true;
    } else {
      this.route.navigateByUrl('/products');
      return false;
    }
  }
}
