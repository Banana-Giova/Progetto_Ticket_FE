import { Component } from '@angular/core';
import { RegisterModel } from './models/register.model';
import { UserAPIService } from '../services/user.api.service';
import { tap, catchError, finalize, Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../core/guards/unsaved.guard';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register implements CanComponentDeactivate {
  
  model: RegisterModel = new RegisterModel();
  hide: boolean = true;

  constructor(private service: UserAPIService) {}
  
  canDeactivate(): boolean {
    if (this.model.isDirty()) {
      return confirm("Hai modifiche non salvate. Vuoi abbandonare?");
    }
    return true;
  }

  register = () => {
    this.service.register$(this.model).pipe(
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