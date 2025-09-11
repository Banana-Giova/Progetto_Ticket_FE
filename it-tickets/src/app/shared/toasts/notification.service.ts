import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';

export type ToastType = 'success'|'error'|'info'|'warning';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private cfg(duration = 4000, panelClass: string[] = []): MatSnackBarConfig {
    return {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass
    };
  }

  private mapType(t: ToastType) {
    return { success: 'Success', error: 'Error', info: 'Info', warning: 'Warn' }[t];
  }

  showComponent(message: string, type: ToastType = 'info', duration = 4000): MatSnackBarRef<NotificationComponent> {
    const snackType = this.mapType(type);
    const panel = [`toast-${type}`];
    this.snackBar.dismiss();
    const ref = this.snackBar.openFromComponent(NotificationComponent, {
      data: { message, snackType },
      ...this.cfg(duration, panel)
    });
    return ref as MatSnackBarRef<NotificationComponent>;
  }

  success(m: string, d = 3000){ return this.showComponent(m,'success',d); }
  error(m: string, d = 6000){ return this.showComponent(m,'error',d); }
  info(m: string, d = 4000){ return this.showComponent(m,'info',d); }
  warning(m: string, d = 5000){ return this.showComponent(m,'warning',d); }

  checkBackend = (m: string): string => {
    if (m.search("0 Unknown Error")) {
      return "Hai scordato di accedere il backend!";
    } return m;
  }
}
