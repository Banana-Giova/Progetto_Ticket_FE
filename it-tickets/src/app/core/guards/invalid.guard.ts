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
export class InvalidGuard implements CanActivate {
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
    
    if (state.url !== "/home" || "/" || "") {
      this.notify.warning("Percorso invalido.");
      console.log("[Invalid Guard] Accesso negato alla route: route invalida.");
    } else {
      console.log("[Invalid Guard] Accesso negato alla route: home non disponibile.");
    }
    if (this.auth.isLoggedIn) {
        this.router.navigate([reactiveLinks.profile]);
    } else {
        this.router.navigate([reactiveLinks.login]);
    }
    return false;
  }
}