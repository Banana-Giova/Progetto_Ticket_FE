import { Component } from '@angular/core';
import { ForgotPasswordModel } from './models/forgot-password.model';
import { UserAPIService } from '../services/user.api.service';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})

export class ForgotPassword {
  model = new ForgotPasswordModel();

  constructor(
    private service: UserAPIService,
    private notify: NotificationService
  ) { }

  forgotPassword = () => {
    this.service.forgotPassword$(this.model).pipe(
      tap(() => {
        this.notify.success('Email di recupero inviata!');
      }),
      catchError(err => {
        const msg = err.error?.message || err.message || 'Errore sconosciuto';
        this.notify.error('Invio email di recupero fallito: ' + msg);
        return throwError(() => err);
      })
    ).subscribe();
  }
}