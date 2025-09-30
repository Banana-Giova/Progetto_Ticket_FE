import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import { UserAvatarService } from '../../shared/user-avatar/user-avatar.service';
import { UserAvatarModel } from '../../shared/user-avatar/models/user-avatar.model';
import { NotificationService } from '../../shared/toasts/notification.service';
import { MAT_MENU_DEFAULT_OPTIONS } from '@angular/material/menu';
import { reactiveLinks } from '../../shared/router-links/router-links';
import { UserStorageService } from '../../pages/auth/services/user.storage';
import { Tickets } from '../../pages/ticket/components/tickets/tickets';
import { TicketService } from '../../pages/ticket/services/ticket.service';
import { UserNotificationService } from '../notifications/user-notification.service';

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

export class Header implements OnInit {
  public logoUrl = '/logo_de.png';
  public isLoggedIn$: Observable<boolean>;
  public isOperator$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  public canGoBack$: Observable<boolean>;
  protected avatar$: Observable<UserAvatarModel>;
  public reactiveLinks = reactiveLinks;
  public readonly backupIcon = '/unavailable_grey.png';

  constructor(
    private authService: AuthService,
    private avatarService: UserAvatarService,
    private storage: UserStorageService,
    private notify: NotificationService,
    private router: Router,
    private location: LocationService,
    private ticketService: TicketService,
    private userNotification: UserNotificationService
  ) {
    this.isLoggedIn$ = this.authService.loggedIn$;
    this.isOperator$ = this.authService.operatorStatus$;
    this.isAdmin$ = this.authService.adminStatus$
    this.canGoBack$ = this.location.canGoBack$;
    this.avatar$ = this.avatarService.userAvatar$;
  }

  ngOnInit() {
    const user = this.storage.getUser();
    if (user && user.id !== -1) {
      this.avatarService.createAvatar();
      this.userNotification.start();

    } else {
      this.storage.clearAll();
      this.avatarService.clear();
      this.router.navigateByUrl(reactiveLinks.login);
    }
  }

  profileTickets(): void {
    this.ticketService.setIsGestione(false);
    this.router.navigateByUrl(reactiveLinks.yourTickets);
  }

  allTickets(): void {
    this.ticketService.setIsGestione(true);
    this.router.navigateByUrl(reactiveLinks.allTickets);
  }

  goBack() {
    this.location.back();
  }

  logout = () => {
    this.authService.logout(this.router, this.avatarService, this.notify);
  }
}
