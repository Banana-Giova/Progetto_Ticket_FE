import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';
import { PagesRoutingModule } from './pages-routing.module';
import { Login } from './login/login';

@NgModule({
  declarations: [
    Home,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule {
}