import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { GuestGuard } from '../core/guards/guest.guard';
import { InvalidGuard } from '../core/guards/invalid.guard';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {    
    path: '',
    canActivate: [InvalidGuard],
    children: []
  },
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
  {
    path: 'ticket',
    canActivate: [AuthGuard],
    loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/local-notifications.module').then(m => m.SessionNotificationModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./other/info.module').then(m => m.InfoModule)
  },
  {
    path: '**',
    canActivate: [InvalidGuard],
    children: []
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }