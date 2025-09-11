import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './models/reset-password.model';
import { UserAPIService } from '../services/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../services/user.storage';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CanComponentDeactivate } from '../../../core/guards/unsaved.guard';
import { reactiveLinks } from '../../../shared/router-links/router-links';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})

export class ResetPassword implements OnInit, CanComponentDeactivate {
  protected hideOld = true;
  protected hideNew = true;
  protected email = '';
  protected token = '';
  protected model = new ResetPasswordModel();
  public reactiveLinks = reactiveLinks;

  constructor(
    private service: UserAPIService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private storage: UserStorageService
  ) { }


  ngOnInit(): void {
    const user = this.storage.getUser();
    const queryToken = this.route.snapshot.queryParamMap.get('passToken');

    if (this.authService.isLoggedIn && !queryToken && user?.email && user.email != '') {
      this.email = user.email;
      this.notify.success('Inizializzato reset password autenticato!');
      return;
    }

    if (!this.authService.isLoggedIn && queryToken) {
      this.token = queryToken;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true
      });
      this.notify.success('Inizializzato reset password non autenticato!');
      return;
    }

    this.notify.error('Inizializzazione reset password fallito.');
    this.router.navigateByUrl(reactiveLinks.login);
    return;
  }

  canDeactivate(): boolean {
    if (this.model.isDirty()) {
      return confirm("Il reset password non è ancora completo. Vuoi abbandonare?");
    }
    return true;
  }

  resetPassword = () => {
    this.model.userEmail = this.email;
    this.model.passwordToken = this.token;

    this.service.resetPassword$(this.model).pipe(
      tap(() => {
        this.notify.success('Reset password completato!')
      }),
      catchError(err => {
        const msg = err.error?.message || err.message || 'Errore sconosciuto';
        this.notify.error('Reset password fallito: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      })
    ).subscribe();
  }
}