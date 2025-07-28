import { Component } from '@angular/core';
import { ResetPasswordModel } from './models/reset-password.model';
import { UserAPIService } from '../services/user.api.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})

export class ResetPassword {
  hideOld = true;
  hideNew = true;
  model = new ResetPasswordModel();
  // Inserire ngOnInit per prendere l'email

  constructor(private service: UserAPIService) { }

  resetPassword = () => {
    this.model.userEmail = 'giovannidigiuseppe@protonmail.com';
    // Mail hardcoded, rimuovere quando il login funge

    this.service.resetPassword$(this.model).pipe(
    // tap(() => {
    //   // Inserire toast successo OK
    // }),
    // catchError(err => {
    //   // Inserire toast errore KO
    //   throw err;
    // })
    ).subscribe();
  }
}