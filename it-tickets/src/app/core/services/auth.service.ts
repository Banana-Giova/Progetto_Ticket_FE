import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStorageService } from '../../pages/auth/services/user.storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;

  constructor(private storage: UserStorageService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(!!this.storage.getToken());
    this.loggedIn$ = this.loggedInSubject.asObservable();
    console.log("Logged in: " + this.isLoggedIn)
  }

  markAsLoggedIn() {
    this.loggedInSubject.next(true);
    console.log("Logged in: " + this.isLoggedIn)
  }

  logout(): void {
    this.storage.clearToken();
    this.loggedInSubject.next(false);
  }

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
