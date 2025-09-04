import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success'|'error'|'info'|'warning';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  private cfg(duration = 4000): MatSnackBarConfig {
    return { duration, horizontalPosition: 'right', verticalPosition: 'bottom' };
  }

  show(message: string, type: ToastType = 'info', duration = 4000) {
    this.snackBar.dismiss();
    this.snackBar.open(message, 'Chiudi', { ...this.cfg(duration), panelClass: [`toast-${type}`] });
  }

  success(m: string, d = 3000){ this.show(m,'success',d); }
  error(m: string, d = 6000){ this.show(m,'error',d); }
  info(m: string, d = 4000){ this.show(m,'info',d); }
  warning(m: string, d = 5000){ this.show(m,'warning',d); }
}
