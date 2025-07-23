import { Component, OnInit } from '@angular/core';
import { EmailConfirmationModel } from './models/email-confirmation.model';
import { UserAPIService } from '../services/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  standalone: false,
  templateUrl: './email-confirmation.html',
  styleUrl: './email-confirmation.css'
})

export class EmailConfirmation {
  token?: string;
  model: EmailConfirmationModel = new EmailConfirmationModel();
  
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
  }

  confirmEmail = () => {
    this.service.confirmEmail$(this.model).subscribe();
  }
}
