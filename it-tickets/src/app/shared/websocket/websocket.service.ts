import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, share, take, takeUntil } from 'rxjs/operators';
import { UserNotification } from '../../core/notifications/models/notification.model';

export type TokenTransport = 'header' | 'query' | 'none';

@Injectable({ providedIn: 'root' })
export class WebsocketService implements OnDestroy {
  private client!: Client;
  private connected$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  // mappa destination -> Subject per multicast delle notifiche
  private subscriptions = new Map<string, Subject<UserNotification>>();
  private stompSubscriptions = new Map<string, StompSubscription>();

  // base url (senza /ws)
  // es. setta in environment: environment.apiBase = 'http://localhost:8080'
  private readonly endpoint = '/ws';

  constructor(private ngZone: NgZone) {}

  /**
   * Connette il client STOMP/SockJS.
   * @param baseUrl es. 'http://localhost:8080' (no trailing slash)
   * @param token opzionale JWT token
   * @param tokenTransport 'header' | 'query' | 'none'
   */


  private createStompSubscription = (destination: string, subject: Subject<UserNotification>) => {
    console.log('[WS] createStompSubscription for', destination);

    const clientConnected = (this.client as any)?.connected ?? this.connected$.getValue();
    if (!clientConnected) {
      console.warn('[WS] client non connesso -> skip subscribe for', destination);
      return;
    }

    try {
      // Rimuove la subscription precedente se esiste
      this.unsubscribeStompDestination(destination);

      const headers = { 
        id: `sub-${Math.random().toString(36).slice(2)}`, 
        ack: 'auto' 
      } as any;

      console.log('[WS] subscribing with headers', headers);
      
      const stompSub: StompSubscription = this.client.subscribe(
        destination, 
        (msg: IMessage) => {
          console.log('[WS] STOMP MESSAGE received', { destination, raw: msg });
          try {
            const body = msg.body && msg.body.length ? JSON.parse(msg.body) : null;
            console.log('[WS] parsed message body', body);
            subject.next(body as UserNotification);
          } catch (e) {
            console.error('[WS] parsing error', e, msg.body);
          }
        }, 
        headers
      );

      // Salva la nuova subscription
      this.stompSubscriptions.set(destination, stompSub);

      // completa la subscription se il subject termina
      subject.pipe(takeUntil(this.destroy$)).subscribe({
        complete: () => {
          this.unsubscribeStompDestination(destination);
        }
      });

    } catch (err) {
      console.error('[WS] errore durante client.subscribe()', err);
    }
  }

    // Metodo per unsubscribe STOMP
  private unsubscribeStompDestination = (destination: string) => {
    const stompSub = this.stompSubscriptions.get(destination);
    if (stompSub) {
      try {
        stompSub.unsubscribe();
        console.log('[WS] stomp unsubscribed', destination);
      } catch (e) {
        console.error('[WS] errore durante unsubscribe stomp', e);
      }
      this.stompSubscriptions.delete(destination);
    }
  }

  connect(baseUrl: string, token?: string, tokenTransport: TokenTransport = 'header'): void {
    if (this.client && this.client.active) {
      console.warn('STOMP client già attivo');
      return;
    }

    const sockUrl = this.prepareSockUrl(baseUrl, token, tokenTransport);
    // il client STOMP (non usare brokerURL se usi SockJS)
    this.client = new Client({
      // disabilita log troppo verbosi in produzione
      debug: (str) => { /* console.log('[STOMP]', str); */ },
      reconnectDelay: 5000, // reconnect automatico (ms). 0 = disabled
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      // use SockJS factory for the client
      webSocketFactory: () => new (SockJS as any)(sockUrl),
      onConnect: frame => {
        this.ngZone.run(() => {
          this.connected$.next(true);
          // ri-sottoscrivi tutte le destinazioni registrate
          this.subscriptions.forEach((subject, dest) => {
            // se non c'è già una sottoscrizione attiva lato STOMP la (ri)creiamo
            // normalizziamo la dest
            this.createStompSubscription(dest, subject);
          });
        });
      },
      onDisconnect: () => {
        this.ngZone.run(() => {
          this.connected$.next(false);
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      }
    });

    // Se vogliamo inviare headers personalizzati alla CONNECT (es Authorization),
    // possiamo impostare connectHeaders prima di activate. Non tutti i server li leggono.
    if (token && tokenTransport === 'header') {
      this.client.connectHeaders = { Authorization: `Bearer ${token}` };
    }

    this.client.activate();
  }

  /** prepara l'url per SockJS (se tokenTransport === 'query' aggiunge ?access_token=...) */
  private prepareSockUrl(baseUrl: string, token?: string, transport: TokenTransport = 'header'): string {
    const base = baseUrl.replace(/\/$/, ''); // rimuovi trailing slash
    let url = `${base}${this.endpoint}`; // es. http://localhost:8080/ws
    if (token && transport === 'query') {
      // aggiungiamo param; SockJS invia richieste HTTP (GET) al server /ws/info e altre path
      const sep = url.includes('?') ? '&' : '?';
      url = `${url}${sep}access_token=${encodeURIComponent(token)}`;
    }
    return url;
  }

  /** Stato di connessione observable */
  connectionState(): Observable<boolean> {
    return this.connected$.asObservable().pipe(share());
  }

  /** Subscribe tipizzato ad una destination STOMP (es. /queue/gart).
   *  Restituisce un Observable multicast (riusa soggetto interno). */
  subscribeTo<T = UserNotification>(destination: string): Observable<T> {
    if (this.subscriptions.has(destination)) {
      return this.subscriptions.get(destination)!.asObservable() as Observable<T>;
    }

    const subject = new Subject<UserNotification>();
    this.subscriptions.set(destination, subject);

    // Se siamo già CONNESSI, creiamo la sottoscrizione; altrimenti attendiamo il prossimo onConnect
    const alreadyConnected = (this.client as any)?.connected ?? this.connected$.getValue();
    if (alreadyConnected) {
      this.createStompSubscription(destination, subject);
    } else {
      // attendi il prossimo true (solo 1 volta)
      this.connected$.pipe(filter(v => v === true), take(1)).subscribe(() => {
        this.createStompSubscription(destination, subject);
      });
    }

    return subject.asObservable() as Observable<T>;
  }
  /** send a message to destination (payload sarà serializzato in JSON) */
  send(destination: string, payload: any): void {
    if (!this.client || !this.client.active) {
      throw new Error('STOMP non connesso');
    }
    this.client.publish({ destination, body: JSON.stringify(payload) });
  }

  /** Unsubscribe interno e rimuove subject */
  unsubscribeDestination(destination: string) {
    // Prima unsubscribe dalla subscription STOMP
    this.unsubscribeStompDestination(destination);
    
    // Poi completa il subject
    const subj = this.subscriptions.get(destination);
    if (subj) {
      subj.complete();
      this.subscriptions.delete(destination);
    }
  }

  disconnect() {
    if (this.client && this.client.active) {
      this.client.deactivate();
    }
    this.connected$.next(false);
    
    // Pulisce tutte le subscriptions STOMP
    this.stompSubscriptions.forEach((sub, dest) => {
      try {
        sub.unsubscribe();
      } catch (e) {}
    });
    this.stompSubscriptions.clear();
    
    // Completa tutti i subject locali
    this.subscriptions.forEach(s => s.complete());
    this.subscriptions.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.disconnect();
  }
}
