import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { catchError } from 'rxjs/operators';
import { environment } from '@env';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(protected cookie: CookieService, private http: HttpService) {
  }
  token: string;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this.http.getToken();

    if (
      this.http.isLoggedIn() && (request.url.includes(environment['url'])  )
    ) {
      if (request.url.split('/')[0] !== 'assets') {
        request = request.clone({
          // withCredentials: true,
          // setHeaders: {
          //   Authorization: this.token
          // },
        });
      }
    }
    return next.handle(request);
  }
}
