import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public logoUrl = '/logo_de.png';
  public isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService,
              private router: Router) {
    this.isLoggedIn$ = this.authService.loggedIn$;
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
