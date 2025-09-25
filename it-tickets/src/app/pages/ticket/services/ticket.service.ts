import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  private isGestioneSubject = new BehaviorSubject<boolean>(false);
  isGestione$ = this.isGestioneSubject.asObservable();

  setIsGestione(value: boolean) {
    this.isGestioneSubject.next(value);
  }

  getIsGestione(): boolean {
    return this.isGestioneSubject.value;
  }
}