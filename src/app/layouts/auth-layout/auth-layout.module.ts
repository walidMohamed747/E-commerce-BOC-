import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from 'app/features/acu-auth/pages/login/login.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AuthLayoutRoutingModule,
    SharedModule

  ]
})
export class AuthLayoutModule { }
