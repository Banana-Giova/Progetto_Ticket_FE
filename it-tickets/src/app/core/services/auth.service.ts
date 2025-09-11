import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStorageService } from '../../pages/auth/services/user.storage';
import { Router } from '@angular/router';
import { UserAvatarService } from '../../shared/user-avatar/user-avatar.service';
import { NotificationService } from '../../shared/toasts/notification.service';
import { reactiveLinks } from '../../shared/router-links/router-links';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  private operatorSubject: BehaviorSubject<boolean>;
  public operatorStatus$: Observable<boolean>;

  private adminSubject: BehaviorSubject<boolean>;
  public adminStatus$: Observable<boolean>;

  public reactiveLinks = reactiveLinks;

  constructor(private storage: UserStorageService) {

    this.loggedInSubject = new BehaviorSubject<boolean>(!!this.storage.getToken());
    this.loggedIn$ = this.loggedInSubject.asObservable();

    this.operatorSubject = new BehaviorSubject<boolean>((this.storage.getUser()?.roles)?.includes('Operatore') ?? false);
    this.operatorStatus$ = this.operatorSubject.asObservable();

    this.adminSubject = new BehaviorSubject<boolean>((this.storage.getUser()?.roles)?.includes('Amministratore') ?? false);
    this.adminStatus$ = this.adminSubject.asObservable();

    console.log("Logged in: " + this.isLoggedIn);
  }

  markAsLoggedIn() {
    this.loggedInSubject.next(true);
    this.operatorSubject.next((this.storage.getUser()?.roles)?.includes('Operatore') ?? false);
    this.adminSubject.next((this.storage.getUser()?.roles)?.includes('Amministratore') ?? false);
    console.log("Logged in: " + this.isLoggedIn)
  }

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  get isOperator(): boolean {
    return this.operatorSubject.value;
  }

  get isAdmin(): boolean {
    return this.adminSubject.value;
  }

  public logout = async (
    router: Router, 
    avatarService: UserAvatarService, 
    notify: NotificationService): Promise<boolean>  => 
  {
    this.storage.clearAll();
    this.loggedInSubject.next(false);
    this.operatorSubject.next(false);
    this.adminSubject.next(false);

    try {
      const res = await router.navigateByUrl(reactiveLinks.login, { replaceUrl: true });
    } finally {
      avatarService.clear();
      notify.success('Logout effettuato con successo!');
    }
    return true;
  }
}
