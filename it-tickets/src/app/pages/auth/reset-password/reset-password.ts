import { Component, OnInit } from '@angular/core';
import { ResetPasswordModel } from './models/reset-password.model';
import { UserAPIService } from '../services/user.api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../services/user.storage';

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
    private route: ActivatedRoute,
    private router: Router,
    private storage: UserStorageService
  ) {}


ngOnInit(): void {
  const user = this.storage.getUser();
  if (user?.email && user.email != '') {
    this.email = user.email;
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
    return;
  }
  // Toast di errore se le cose vanno storte
}

  resetPassword = () => {
    this.model.userEmail = this.email;

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