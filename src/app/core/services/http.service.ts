import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
// import {
//   UserData,
//   Login,
// } from '@core/models/model';
import { environment } from '@env';
import { Location } from '@angular/common';
import _, { get } from 'lodash';
import { Login, UserData } from '../models/model';
declare var Swal;
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = environment.url;
  private token: string;
  private userData: UserData;

  constructor(
    private http: HttpClient,
    protected cookie: CookieService,
    private router: Router,
  ) {}

  // Login Service
  login(login: Login): Observable<any> {
    return this.http.post(`${this.url}/auth/login`, login).pipe(
      tap((response) => {
        const token = response.token;
        const data = response;
        this.saveData(token, data);
        return response;
      })
    );
  }
// Logout  Service
  logout(): void {
    this.cookie.deleteAll('*/*');
    this.cookie.deleteAll('/');
    this.cookie.deleteAll();
    this.router.navigateByUrl('auth/login');
  }

  logoutSession(): void {
    this.cookie.deleteAll('*/*');
    this.cookie.deleteAll('/');
    this.cookie.deleteAll();
    setTimeout(() => {
      this.router.navigateByUrl('auth/login');
    }, 1000);
  }
//#region  Mange Token
  getToken(): string {
    if (this.checkToken()) {
      this.token = this.cookie.get('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

  checkToken(): boolean {
    return this.cookie.check('token');
  }
  //#endregion Manage Token


  getUserData(): UserData {
    if (this.checkToken()) {
      this.userData = JSON.parse(this.cookie.get('userData'));
    }
    return this.userData;
  }

  isLoggedIn(): boolean {
    return this.cookie.check('Auth');
  }

  saveData(token?: string, userData?: UserData): void {
    this.cookie.set('Auth', 'true', null, '/');
    this.cookie.set('token', 'Bearer' + token, null, '/');
    this.cookie.set('userData', userData + '', null , '/');
  }
}
