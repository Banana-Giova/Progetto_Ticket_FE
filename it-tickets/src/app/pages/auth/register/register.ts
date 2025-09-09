import { Component } from '@angular/core';
import { RegisterModel } from './models/register.model';
import { UserAPIService } from '../services/user.api.service';
import { tap, catchError, finalize, Observable, throwError } from 'rxjs';
import { CanComponentDeactivate } from '../../../core/guards/unsaved.guard';
import { NotificationService } from '../../../shared/toasts/notification.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register implements CanComponentDeactivate {

  model: RegisterModel = new RegisterModel();
  hide: boolean = true;

  constructor(
    private service: UserAPIService,
    private notify: NotificationService
  ) { }

  canDeactivate(): boolean {
    if (this.model.isDirty()) {
      return confirm("Hai modifiche non salvate. Vuoi abbandonare?");
    }
    return true;
  }

  register = () => {
    this.service.register$(this.model).pipe(
      tap(() => {
        this.notify.success('Registrazione completata. Verifica la tua email per attivare l\'account.')
      }),
      catchError(err => {
        const msg = err.error?.message || err.message || 'Errore sconosciuto';
        this.notify.error('Registrazione fallita: ' + msg);
        return throwError(() => err);
      })
    ).subscribe();
  }
}