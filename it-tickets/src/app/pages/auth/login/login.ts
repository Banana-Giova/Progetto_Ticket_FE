import { Component, OnInit } from '@angular/core';
import { LoginModel } from './models/login.model';
import { UserAPIService } from '../services/user.api.service';
import { catchError, tap } from 'rxjs/operators';
import { UserStorageService } from '../services/user.storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  model = new LoginModel();
  hide = true;
  returnUrl: string = '/profile'; 

  constructor(
    private router: Router,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loginService: UserAPIService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  login() {
    this.loginService.login$(this.model).pipe(
      tap((response) => {
        console.log('USER_KEY raw:', localStorage.getItem('userInfo'));
        console.log('TOKEN raw:', localStorage.getItem('jwtToken'));

        this.userStorage.saveToken(response.token);
        this.userStorage.saveUser(response);
        this.authService.markAsLoggedIn();
        this.router.navigateByUrl(this.returnUrl);
      }),
      catchError(err => {
        const msg = err.error?.message || err.message || 'Errore sconosciuto';
        this.notify.error('Login fallito: ' + msg);
        return throwError(() => err);
      })
    ).subscribe();
  }
}