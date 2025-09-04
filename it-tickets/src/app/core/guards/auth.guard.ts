import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/toasts/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedIn) {
      this.notify.warning("[Auth Guard] Accesso negato alla route per gli utenti non autenticati.")   
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}