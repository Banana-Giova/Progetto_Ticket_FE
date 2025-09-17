import { Injectable } from '@angular/core';
import { authLinks, guestLinks, wildCardLinks } from '../../shared/router-links/go-back-links';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LocationService {

  private canGoBackSubject: BehaviorSubject<boolean>;
  public canGoBack$: Observable<boolean>;
  public authLinks = authLinks;
  public guestLinks = guestLinks;
  public wildCardLinks = wildCardLinks;

  private currentUrl: string;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private location: Location
    ) {
    this.canGoBackSubject = new BehaviorSubject<boolean>(false);
    this.canGoBack$ = this.canGoBackSubject.asObservable();
    this.isLoggedIn$ = this.authService.loggedIn$;
    
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        this.currentUrl = event.url;
        this.checkGoBack();
      };
    });
  }

  get canGoBack(): boolean {
    return this.canGoBackSubject.value;
  }

  checkGoBack() {
    console.log('Controllo del percorso precedente:', this.currentUrl);
    if (
      (Object.values(authLinks).includes(this.currentUrl) && !this.authService.isLoggedIn) ||
      (Object.values(guestLinks).includes(this.currentUrl) && this.authService.isLoggedIn) ||
      Object.values(wildCardLinks).includes(this.currentUrl)
    ) {
      console.log('Navigazione non consentita. Impostazione canGoBack su false');
      this.canGoBackSubject.next(false);
    } else {
      console.log('Navigazione consentita. Impostazione canGoBack su true');
      this.canGoBackSubject.next(true);
    }
  }

  back = (): void => {
    this.location.back();
  }
}
