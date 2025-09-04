import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './models/profile.model';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/user.storage';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})

export class Profile implements OnInit {

  public avatarUrl = '/profile_icon.png';
  public profile: ProfileModel = {} as ProfileModel;
  public roleString: string = '';

  constructor (
    private router: Router,
    private storage: UserStorageService,
    private profileService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.storage.getUser();
    if (user && user.id !== -1) {

      this.profile = user as ProfileModel;
      this.roleString = this.profile.roles.join(', ');

    } else {
      this.storage.clearAll();
      // Toast di errore
      this.router.navigateByUrl('/login');
    }
  }

  profileTickets(): void {
    this.router.navigateByUrl('/ticket/tickets');
  }

  onChangePassword(): void {
    this.router.navigateByUrl('/reset-password');
  }

  logout(): void {
    this.profileService.logout();
    this.router.navigateByUrl('/login');
  }
}