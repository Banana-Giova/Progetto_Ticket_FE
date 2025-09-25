import { Component } from '@angular/core';
import { UserNotificationService } from '../../user-notification.service';
import { UserNotification } from '../../models/notification.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { reactiveLinks } from '../../../../shared/router-links/router-links';

@Component({
  selector: 'app-unread-notifications',
  templateUrl: './unread-notifications.html',
  styleUrls: ['./unread-notifications.css'],
  standalone: false
})
export class UnreadNotifications {

  expandedId: number | null = null;
  protected reactiveLinks = reactiveLinks;

  constructor(protected userNotif: UserNotificationService) {}

  toggleExpand(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  onMarkAsRead(id: number, menuTrigger: MatMenuTrigger) {
    // chiude il menu (rapidamente)
    try { menuTrigger.closeMenu(); } catch { /* no-op */ }

    // chiama il service (il service si occupa di rimuovere localmente on success)
    this.userNotif.markAsRead(id);
  }

  trackById(_: number, item: UserNotification) {
    return item?.id ?? _;
  }
}
