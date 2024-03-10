import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
// import { SharedModule } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule

  ],
  declarations: [
    FooterComponent,
    NavbarComponent

  ],
  exports: [
    FooterComponent,
    NavbarComponent,
  ]
})
export class ComponentsModule { }

