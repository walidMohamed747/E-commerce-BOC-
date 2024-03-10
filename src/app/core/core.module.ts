import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGurd } from './guards/auth-guard';
import { IsLogged } from './guards/auth.guard.islogged';
import { HttpService } from './services/http.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ComponentsModule],
})
export class CoreModule {
  static authGuard(): ModuleWithProviders<any> {
    return { ngModule: CoreModule, providers: [AuthGurd] };
  }

  static isLogged(): ModuleWithProviders<any> {
    return { ngModule: CoreModule, providers: [IsLogged] };
  }
  static http(): ModuleWithProviders<any> {
    return { ngModule: CoreModule, providers: [HttpService] };
  }
  static tokenInter(): ModuleWithProviders<any> {
    return { ngModule: CoreModule, providers: [TokenInterceptor] };
  }

  static cookieService(): ModuleWithProviders<any> {
    return { ngModule: CoreModule, providers: [CookieService] };
  }
  static tokenInterceptor(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    };
  }
}
