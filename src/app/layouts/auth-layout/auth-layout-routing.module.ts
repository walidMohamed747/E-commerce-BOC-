import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { LoginComponent } from 'app/features/acu-auth/pages/login/login.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      { path: 'login', component: LoginComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(AuthLayoutRoutes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
