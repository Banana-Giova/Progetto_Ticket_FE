import { Component, OnInit } from '@angular/core';
import { UserNotificationService } from '../../user-notification.service';
import { UserNotification } from '../../models/notification.model';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.html',
  styleUrls: ['./all-notifications.css'],
  standalone: false
})
export class AllNotifications implements OnInit {
  search$ = new BehaviorSubject<string>('');

  // observable esposti al template
  filteredAll$!: Observable<UserNotification[]>;
  filteredUnread$!: Observable<UserNotification[]>;
  filteredRead$!: Observable<UserNotification[]>;

  expandedId: number | null = null;

  constructor(public userNotif: UserNotificationService) {}

  ngOnInit(): void {
    const all$ = combineLatest([this.userNotif.unread$, this.userNotif.read$]).pipe(
      map(([unread, read]) => {
        // unisco e ordino per createdAt (decrescente)
        const merged = [...unread, ...read];
        return merged.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
    );

    this.filteredAll$ = combineLatest([all$, this.search$]).pipe(
      map(([list, q]) => this.filterList(list, q))
    );

    this.filteredUnread$ = combineLatest([this.userNotif.unread$, this.search$]).pipe(
      map(([list, q]) => this.filterList(list, q))
    );

    this.filteredRead$ = combineLatest([this.userNotif.read$, this.search$]).pipe(
      map(([list, q]) => this.filterList(list, q))
    );
  }

  private filterList(list: UserNotification[], q: string): UserNotification[] {
    if (!q || q.trim() === '') return list;
    const lower = q.trim().toLowerCase();
    return list.filter(n =>
      ((n.destination ?? '') + ' ' + (n.message ?? '')).toLowerCase().includes(lower)
    );
  }

  toggleExpand(id: number | null) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  onMarkAsRead(id: number, $event?: Event) {
    if ($event) $event.stopPropagation();
    this.userNotif.markAsRead(id);
  }

  trackById(_: number, item: UserNotification) {
    return item?.id ?? _;
  }
}
