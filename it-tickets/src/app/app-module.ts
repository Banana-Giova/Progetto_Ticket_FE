import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Home } from './pages/home/home';
import { AppRoutingModule } from './app-routing-module';
import { CoreModule } from './core/core-module';

@NgModule({
  declarations: [
    App,
    Home
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
