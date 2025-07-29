import { Component, OnInit } from '@angular/core';
import { EmailConfirmationModel } from './models/email-confirmation.model';
import { UserAPIService } from '../services/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';

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
  
  constructor(
    private service: UserAPIService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? undefined;
  
    if (!this.token) {
      this.router.navigate(['/'])
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
      this.success = 'true'
      
      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify([...confirmed, this.token!])
      );
    }),

    catchError(err => {
      if (err.status === 400) {
        this.success = 'false';
        return EMPTY;
      }
      throw err;
      
    })).subscribe();
  }

  loginRedirect = (): void => {
    this.router.navigate(['/login']);
  }

  registerRedirect = (): void => {
    this.router.navigate(['/register']);
  }
}