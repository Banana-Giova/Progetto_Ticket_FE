import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { GuestGuard } from '../core/guards/guest.guard';
// import { AuthLoadGuard } from '../core/guards/auth-load.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'register',
    canActivate: [GuestGuard],
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'email-confirmation',
    loadChildren: () => import('./auth/email-confirmation/email-confirmation.module').then(m => m.EmailConfirmationModule)
  },
  {
    path: 'forgot-password',
    canActivate: [GuestGuard],
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/profile/profile.module').then(m => m.ProfileModule)
  },
  { path: '**', redirectTo: 'profile' } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
