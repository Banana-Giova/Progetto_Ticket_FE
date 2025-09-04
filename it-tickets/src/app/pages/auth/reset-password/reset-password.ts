import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './models/reset-password.model';
import { UserAPIService } from '../services/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../services/user.storage';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})

export class ResetPassword implements OnInit {
  hideOld = true;
  hideNew = true;
  email = '';
  model = new ResetPasswordModel();

  constructor(
    private service: UserAPIService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: UserStorageService
  ) { }


  ngOnInit(): void {
    const user = this.storage.getUser();
    if (user?.email && user.email != '') {
      this.email = user.email;
      this.notify.success('Inizializzato reset password per l\'account con mail: ' + this.email);
      return;
    }

    const queryEmail = this.route.snapshot.queryParamMap.get('email');
    if (queryEmail) {
      this.email = queryEmail;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true
      });
      this.notify.success('Inizializzato reset password per l\'account con mail: ' + this.email);
      return;
    }

    this.notify.error('Fetch dell\'email fallito, reset password invalido.');
    this.router.navigateByUrl('/login');
    return;
  }

  resetPassword = () => {
    this.model.userEmail = this.email;

    this.service.resetPassword$(this.model).pipe(
      tap(() => {
        this.notify.success('Reset password completato!')
      }),
      catchError(err => {
        const msg = err.error?.message || err.message || 'Errore sconosciuto';
        this.notify.error('Reset password fallito: ' + msg);
        return throwError(() => err);
      })
    ).subscribe();
  }
}