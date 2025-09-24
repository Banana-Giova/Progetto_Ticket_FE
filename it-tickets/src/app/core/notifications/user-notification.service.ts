import { Injectable, OnInit } from "@angular/core";
import { TokenTransport, WebsocketService } from "../../shared/websocket/websocket.service";
import { UserStorageService } from "../../pages/auth/services/user.storage";
import { BehaviorSubject, catchError, Subscription, tap, throwError } from "rxjs";
import { UserAPIService } from "../../pages/auth/services/user.api.service";
import { NotificationService } from "../../shared/toasts/notification.service";
import { UserNotification } from "./models/notification.model";

@Injectable({ providedIn: 'root' })
export class UserNotificationService implements OnInit {
  baseUrl = 'http://localhost:8080';
  token = '';
  userEmail = '';
  transport: TokenTransport = 'header';
  connected = false;
  
  // Subjects interni
  private _unread$ = new BehaviorSubject<UserNotification[]>([]);
  private _read$ = new BehaviorSubject<UserNotification[]>([]);

  // Observable pubblici
  public unread$ = this._unread$.asObservable();
  public read$ = this._read$.asObservable();

  listEmpty = true;
  private subs: Subscription[] = [];

  constructor(
    private websocket: WebsocketService,
    private userStorage: UserStorageService,
    private userService: UserAPIService,
    private notify: NotificationService
  ) {
  this.token = this.userStorage.getToken()!!;
  const user = this.userStorage.getUser();
  if (user && user.id !== -1) {
    this.userEmail = user.email;
  }
  this.subs.push(this.websocket.connectionState().subscribe(s => this.connected = s));
  }

  ngOnInit(): void {
    this.getPending();
    this.getAlreadyRead();
    this.connect();
    this.subscribeToUserUserNotifications();
  }

  getPending = () => {
    this.userService.getPending$(this.userEmail).pipe(
      tap(data => {
        const item = data?.content ?? data;
        if (!item) { return; }
        const arr = Array.isArray(item) ? item : [item];
        this._unread$.next([...arr, ...this._unread$.getValue()]);
        this.listEmpty = this._unread$.getValue().length === 0;
      }),
      catchError(err => {
        const msg = err?.error?.message || err?.message || 'Errore sconosciuto';
        this.notify.error('Errore nel caricamento delle notifiche in arrivo: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      })
    ).subscribe();
  }

  getAlreadyRead = () => {
    this.userService.getAlreadyRead$(this.userEmail).pipe(
      tap(data => {
        const item = data?.content ?? data;
        if (!item)  { return; }
        const arr = Array.isArray(item) ? item : [item];
        this._read$.next([...arr, ...this._read$.getValue()]);
      }),
      catchError(err => {
        const msg = err?.error?.message || err?.message || 'Errore sconosciuto';
        this.notify.error('Errore nel caricamento delle notifiche in arrivo: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      })
    ).subscribe();
  }

  connect = () => {
    if (this.token) {
      this.websocket.connect(this.baseUrl, this.token, this.transport);
    } else {
      console.log("No token found for websocket connection!")
    }
  }

  subscribeToUserUserNotifications = () => {
    if (!this.userEmail) return;
    const sub = this.websocket.subscribeTo<UserNotification>(`${this.userEmail}/queue/notifications`)
      .subscribe(msg => {
        // inserisci in testa alle unread
        this._unread$.next([msg, ...this._unread$.getValue()]);
        this.listEmpty = this._unread$.getValue().length === 0;
      });
    this.subs.push(sub);
  }

  markAsRead = (notifId: number) => {
    this.userService.markAsRead$(notifId).pipe(
      tap(() => {
        // rimuovi localmente dalle unread e opzionalmente sposta in read
        const unread = this._unread$.getValue();
        const idx = unread.findIndex(n => n.id === notifId);
        if (idx !== -1) {
          const [removed] = unread.splice(idx, 1);
          this._unread$.next([...unread]);
          // aggiungi a read localmente (se vuoi)
          this._read$.next([removed, ...this._read$.getValue()]);
        }
        this.listEmpty = this._unread$.getValue().length === 0;
        this.notify.success('Notifica letta!');
      }),
      catchError(err => {
        const msg = err?.error?.message || err?.message || 'Errore sconosciuto';
        this.notify.error('Lettura notifica fallito: ' + this.notify.checkBackend(msg));
        return throwError(() => err);
      })
    ).subscribe();
  }

  // sendTestMessage = () => {
  //   this.websocket.send('/app/echo', { message: 'Ciao dal client' });
  // }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this._unread$.next([]);
    this._read$.next([]);
    this.websocket.disconnect();
    this.listEmpty = true;
  }
}