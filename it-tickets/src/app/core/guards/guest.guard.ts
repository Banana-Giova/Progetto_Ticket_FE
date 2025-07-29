import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isLoggedIn) {
      console.log("GUEST GUARD => BLOCCATO UN UTENTE. LOGGATO? " 
        + this.auth.isLoggedIn)    
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }
}
