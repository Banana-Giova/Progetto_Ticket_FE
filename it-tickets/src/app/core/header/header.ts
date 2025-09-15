import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAvatarService } from '../../shared/user-avatar/user-avatar.service';
import { UserAvatarModel } from '../../shared/user-avatar/models/user-avatar.model';
import { NotificationService } from '../../shared/toasts/notification.service';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { reactiveLinks } from '../../shared/router-links/router-links';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: {
        overlapTrigger: false,
        xPosition: 'before',
        yPosition: 'below',
        overlayPanelClass: 'my-menu-overlay-pane'
      }
    }
  ]
})

export class Header {
  public logoUrl = '/logo_de.png';
  public isLoggedIn$: Observable<boolean>;
  public isOperator$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  protected avatar$: Observable<UserAvatarModel>;
  public reactiveLinks = reactiveLinks;
  public readonly backupIcon = '/unavailable_grey.png';

  constructor(
    private authService: AuthService,
    private avatarService: UserAvatarService,
    private notify: NotificationService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.loggedIn$;
    this.isOperator$ = this.authService.operatorStatus$;
    this.isAdmin$ = this.authService.adminStatus$
    this.avatar$ = this.avatarService.userAvatar$;
  }

  logout = () => {
    this.authService.logout(this.router, this.avatarService, this.notify);
  }
}
