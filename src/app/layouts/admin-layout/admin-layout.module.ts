import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { CoreModule } from 'app/core/core.module';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AdminLayoutRoutingModule,
    ToastModule,
    MessagesModule,
    MessageModule,

  ]
})
export class AdminLayoutModule { }
