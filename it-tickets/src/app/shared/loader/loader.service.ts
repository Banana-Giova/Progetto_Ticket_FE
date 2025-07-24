import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  set isLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  get isLoading$() {
    return this.loading$;
  }
}