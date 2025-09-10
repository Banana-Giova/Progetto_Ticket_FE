import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected title = 'it-tickets';

  constructor() {
    console.log('[AppComponent] constructor - bootstrap');
  }
  ngOnInit() {
    console.log('[AppComponent] ngOnInit');
  }
  ngOnDestroy() {
    console.log('[AppComponent] ngOnDestroy');
  }
}
