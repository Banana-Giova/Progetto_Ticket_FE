import { Component, OnInit } from '@angular/core';
import { EmailConfirmationModel } from './models/email-confirmation.model';
import { UserAPIService } from '../services/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { reactiveLinks } from '../../../shared/router-links/router-links';

@Component({
  selector: 'app-email-confirmation',
  standalone: false,
  templateUrl: './email-confirmation.html',
  styleUrls: ['./email-confirmation.css']
})

export class EmailConfirmation implements OnInit {
  token?: string;
  success?: string;
  model: EmailConfirmationModel = new EmailConfirmationModel();
  private storageKey = 'confirmedToken';
  public reactiveLinks = reactiveLinks;
  
  constructor(
    private service: UserAPIService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? undefined;
  
    if (!this.token) {
      this.router.navigate([reactiveLinks.baseUrl])
      return;
    }
    this.model.token = this.token;

    const confirmed: string[] = JSON.parse(
      sessionStorage.getItem(this.storageKey) || '[]'
    );

    if (confirmed.includes(this.token)) {
      this.success = 'already_confirmed';
      return;
    }

    this.service.confirmEmail$(this.model).pipe(
    tap(() => {
      this.success = 'true';
      this.notify.success('Email confermata!');
      
      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify([...confirmed, this.token!])
      );
    }),

    catchError(err => {
      this.success = 'false';
        const msg = err.error?.message || err.message || 'Errore sconosciuto';
        this.notify.error('Conferma email fallita: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      })).subscribe();
  }

  loginRedirect = (): void => {
    this.router.navigate([reactiveLinks.login]);
  }

  registerRedirect = (): void => {
    this.router.navigate([reactiveLinks.register]);
  }
}