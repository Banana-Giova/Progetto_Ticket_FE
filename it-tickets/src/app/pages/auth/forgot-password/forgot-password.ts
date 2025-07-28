import { Component } from '@angular/core';
import { ForgotPasswordModel } from './models/forgot-password.model';
import { UserAPIService } from '../services/user.api.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})

export class ForgotPassword {
  model = new ForgotPasswordModel();
  // Inserire ngOnInit per prendere l'email

  constructor(private service: UserAPIService) { }

  forgotPassword = () => {
    this.service.forgotPassword$(this.model).pipe(
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