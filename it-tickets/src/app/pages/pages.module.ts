import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';
import { PagesRoutingModule } from './pages-routing.module';
import { Register } from './register/register';

@NgModule({
  declarations: [
    Home,
    Register
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule {
}