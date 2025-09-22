import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoadingInterceptor } from './shared/loader/loading-interceptor';
import { SpinnerModule } from './shared/loader/spinner/spinner.module';
import { AuthorizationInterceptor } from './core/services/auth-interceptors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Modal } from './shared/modal/modal';
import { NotificationComponent } from './shared/toasts/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { LocationService } from './core/services/location.service';
import { Terms } from './pages/other/terms/terms';
import { Privacy } from './pages/other/privacy/privacy';

@NgModule({
  declarations: [
    App,
    Modal,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    SpinnerModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    LocationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
