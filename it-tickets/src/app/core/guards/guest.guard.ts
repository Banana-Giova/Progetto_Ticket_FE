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
export class GuestGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isLoggedIn) {
      console.log("[Guest Guard] Accesso negato alla route per gli utenti autenticati.")
      // this.notify.warning("Accesso negato per gli utenti autenticati.")    
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }
}
