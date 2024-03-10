import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'app/core/models/model';
import { HttpService } from 'app/core/services/http.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData: UserData;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    public http: HttpService,
    protected cookie: CookieService,
    private detect: ChangeDetectorRef
  ) {
  }

  ngOnInit() {}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
