import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from '../../shared/toasts/notification.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public logoUrl = '/logo_de.png';
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.loggedIn$;
  }

  logout = () => {
    this.authService.logout();
    this.notify.success('Logout effettuato con successo!');
    this.router.navigateByUrl('/login');
  }
}
