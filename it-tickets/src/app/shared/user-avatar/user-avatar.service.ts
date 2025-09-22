import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStorageService } from '../../pages/auth/services/user.storage';
import { UserAvatarModel } from './models/user-avatar.model';

@Injectable({ providedIn: 'root' })
export class UserAvatarService {
  private userAvatarSubject = new BehaviorSubject<UserAvatarModel>(new UserAvatarModel());
  public userAvatar$: Observable<UserAvatarModel> = this.userAvatarSubject.asObservable();

  constructor(private storage: UserStorageService) {}

  get userAvatar(): UserAvatarModel {
    return this.userAvatarSubject.value;
  }

  createAvatar(): void {
    const { email, name, surname } = this.storage.getUser() ?? {};
    const model = new UserAvatarModel({ email, name, surname });

    model.findInitials();
    model.computeGradient();
    this.userAvatarSubject.next(model);

    console.log('Initials found: ' + model.initials);
  }

  clear(): void {
    this.userAvatarSubject.next(new UserAvatarModel());
  }
}