import { Component } from '@angular/core';
import { ProfileModel } from './models/profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})

export class Profile {

  public avatarUrl = '/logo_de.png';
  public profile: ProfileModel = {
    name: 'Mario',
    surname: 'Rossi',
    email: 'mario.rossi@example.com',
    role: 'Utente',
  };

  constructor (private router: Router) {}

  profileTickets(): void {
    this.router.navigateByUrl('/tickets');
  }

  onChangePassword(): void {
    this.router.navigateByUrl('/reset-password');
  }
}