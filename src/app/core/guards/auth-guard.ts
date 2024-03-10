import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { environment } from '@env';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';
let status;
@Injectable({
  providedIn: 'root',
})
export class AuthGurd implements CanActivate {
  constructor(
    private route: Router,
    protected cookie: CookieService,
    private auth: HttpService,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLoggedIn() && this.cookie.check('token')) {
      return true;
    } else {
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }
}
