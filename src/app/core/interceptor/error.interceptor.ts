import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { CookieService } from 'ngx-cookie-service';
import {  UserData } from '../models/model';
import { Router } from '@angular/router';
declare var Swal;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    protected cookie: CookieService,
    private http: HttpService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if ([401, 403].includes(err.status) && this.http.getUserData()) {
          // auto logout if 401 or 403 response returned from api
          // parse json object from base64 encoded jwt token
          this.http.logout();
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'your session has expired',
            showConfirmButton: true,
            timer: 5000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('auth/login');
          }, 3000);
          const error =
            (err && err.error && err.error.message) || err.statusText;
          return throwError(error);
          // }
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}
