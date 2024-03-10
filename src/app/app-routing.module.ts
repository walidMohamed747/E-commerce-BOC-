import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogged } from './core/guards/auth.guard.islogged';
import { AuthGurd } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [IsLogged],
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout.module').then(
        (m) => m.AuthLayoutModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGurd], // remove user & pass from environment
    loadChildren: () =>
      import('./layouts/admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutModule
      ),
  },
  // Redirect any other unmatched routes to login
  { path: '**', redirectTo: '/auth/login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
