import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { UserNotificationService } from '../../../../core/notifications/user-notification.service';
import { UserNotification } from '../../../../core/notifications/models/notification.model';
import { tap } from 'rxjs/operators';
import { NotificationDetail } from '../notification-detail/notification-detail';

@Component({
  selector: 'app-all-notifications',
  templateUrl: './all-notifications.html',
  styleUrls: ['./all-notifications.css'],
  standalone: false
})
export class AllNotifications implements OnInit {
  search$ = new BehaviorSubject<string>('');

  filteredAll$!: Observable<UserNotification[]>;
  filteredUnread$!: Observable<UserNotification[]>;
  filteredRead$!: Observable<UserNotification[]>;

  all$!: Observable<UserNotification[]>;
  unreadCount$!: Observable<number>;
  readCount$!: Observable<number>;

  constructor(
    public userNotif: UserNotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.all$ = combineLatest([this.userNotif.unread$, this.userNotif.read$]).pipe(
      map(([unread, read]) => {
        const merged = [...unread, ...read];
        const byId = new Map<number, UserNotification>();
        merged.forEach(n => {
          if (n && n.id !== undefined && n.id !== null) {
            if (!byId.has(n.id)) byId.set(n.id, n);
            else {
              const existing = byId.get(n.id)!;
              if (existing.read && !n.read) return;
              byId.set(n.id, n);
            }
          }
        });
        const arr = Array.from(byId.values());
        return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.unreadCount$ = this.userNotif.unread$.pipe(map(u => u?.length ?? 0), shareReplay(1));
    this.readCount$ = this.userNotif.read$.pipe(map(r => r?.length ?? 0), shareReplay(1));

    this.filteredAll$ = combineLatest([this.all$, this.search$]).pipe(
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
    if (!list) return [];
    if (!q || q.trim() === '') return list;
    const lower = q.trim().toLowerCase();
    return list.filter(n =>
      ('' + (n.destination ?? '') + ' ' + (n.message ?? '')).toLowerCase().includes(lower)
    );
  }

  onMarkAsRead(id: number, $event?: Event) {
    if ($event) $event.stopPropagation();
    this.userNotif.markAsRead(id);
  }

  markAsRead(n: UserNotification, $event: Event): void {
    if ($event) $event.stopPropagation();
    if (!n || n.read) return;

    n.read = true;
    this.userNotif.markAsRead(n.id);
  }

  openNotificationDetail(n: UserNotification, $event?: Event) {
    if ($event) $event.stopPropagation();

    const dialogRef = this.dialog.open(NotificationDetail, {
      width: '600px',
      data: { notification: n },
      autoFocus: false
    });

    dialogRef.afterClosed().pipe(
      tap(result => {
        // if (result === true) { /* eventuale logica addizionale */ }
      })
    ).subscribe();
  }

  trackById(_: number, item: UserNotification) {
    return item?.id ?? _;
  }
}
