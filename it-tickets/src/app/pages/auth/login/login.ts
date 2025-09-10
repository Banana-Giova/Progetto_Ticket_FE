import { Component, OnInit } from '@angular/core';
import { LoginModel } from './models/login.model';
import { UserAPIService } from '../services/user.api.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UserStorageService } from '../services/user.storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { throwError } from 'rxjs';
import { LoaderService } from '../../../shared/loader/loader.service';
import { reactiveLinks } from '../../../shared/router-links/router-links';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  protected model = new LoginModel();
  protected hide = true;
  public returnUrl: string = reactiveLinks.profile;
  public reactiveLinks = reactiveLinks;

  constructor(
    private router: Router,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loginService: UserAPIService,
    private userStorage: UserStorageService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || reactiveLinks.profile;
  }

  login = async () => {
    if (this.model.isValidEmail() && this.model.isValidPassword()) {
      this.loader.isLoading = true;
      let no_error = true;
      this.loginService.login$(this.model).pipe(
        tap((resp) => {
          this.userStorage.saveToken(resp.token);
          this.userStorage.saveUser(resp);
          this.authService.markAsLoggedIn();
        }), finalize(() => {
          this.router.navigateByUrl(reactiveLinks.login, {replaceUrl: true});
          this.loader.isLoading = false;
          if (no_error) {
            this.notify.success('Login effettuato con successo!');
          }
        }),
        catchError(err => {
          no_error = false;
          const msg = err.error?.message || err.message || 'Errore sconosciuto';
          this.notify.error('Login fallito: ' + msg);
          return throwError(() => err);
        })
      ).subscribe();
    } else {
      this.notify.warning("Completa il form di login per accedere.")
    }
  }
}