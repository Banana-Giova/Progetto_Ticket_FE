import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './models/profile.model';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/user.storage';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/toasts/notification.service';
import { UserAvatarService } from '../../../shared/user-avatar/user-avatar.service';
import { Observable } from 'rxjs';
import { UserAvatarModel } from '../../../shared/user-avatar/models/user-avatar.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})

export class Profile implements OnInit {

  public profile: ProfileModel = {} as ProfileModel;
  public roleString: string = '';
  protected avatar$: Observable<UserAvatarModel>;

  constructor (
    private router: Router,
    private notify: NotificationService,
    private storage: UserStorageService,
    private avatarService: UserAvatarService,
    private profileService: AuthService
  ) {this.avatar$ = this.avatarService.userAvatar$;}

  ngOnInit(): void {
    const user = this.storage.getUser();
    if (user && user.id !== -1) {
      this.profile = user as ProfileModel;
      this.roleString = this.profile.roles.join(', ');

      this.avatarService.createAvatar();

    } else {
      this.storage.clearAll();
      this.avatarService.clear();
      this.notify.error('Ruoli utenti non trovati: utente illegale!');
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
    this.avatarService.clear();
    this.notify.success('Logout effettuato con successo!');
    this.router.navigateByUrl('/login');
  }
}