import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../shared/toasts/notification.service';
import { reactiveLinks } from '../../shared/router-links/router-links';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  public reactiveLinks = reactiveLinks;

  constructor(
    private auth: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isAdmin) {
      console.log("[Admin Guard] Accesso negato alla route per gli utenti non autorizzati.")
      this.notify.warning("Area amministratori, accesso negato.")   
      if (this.auth.isLoggedIn) {
        this.router.navigate([reactiveLinks.profile]);
      } else {
        this.router.navigate([reactiveLinks.login]);
      }
      return false;
    }
    return true;
  }
}