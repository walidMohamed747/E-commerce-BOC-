import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env';
import { Login } from 'app/core/models/model';
import { HttpService } from 'app/core/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  loginForm: FormGroup;
  hide = true;
  submitted = false;
  blockedUi: boolean = false;
  image: string;
  private url = environment.url;
  private login: Login;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private httpClient: HttpClient,
    private router: Router,
    // private route: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    protected cookie: CookieService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          // only one
          Validators.pattern('\\s?\\S+(?: \\S+)*\\s?'),
          // min 3 letters
          Validators.pattern(/(.*[a-zA-Z0-9]){1}/i),
          // acept letters, numbers and - _
          Validators.pattern(
            '^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9_-]+( [\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z0-9_-]+)*$'
          ),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  confirmLogin(): boolean {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return false;
    } else {
      this.submitted = true;
      const login = {
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };

      this.subscription.add(
        this.http.login(login).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Logged in  successfully',
              life: 3000,
            });
            this.route.navigateByUrl('/products');
            this.cookie.set('id', res.id, null, '/');
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid credentials',
              life: 3000,
            });
            this.blockedUi = false;
            this.submitted = false;
          }
        )
      );
    }
  }

  get f() {
    return this.loginForm.controls;
  }
  // unsubscribe requests
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
