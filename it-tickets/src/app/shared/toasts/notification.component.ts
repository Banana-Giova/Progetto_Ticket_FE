import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'my-snackbar',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<NotificationComponent>
  ) {}

  dismiss() {
    this.snackBarRef.dismiss();
  }

  get getIcon() {
    switch (this.data?.snackType) {
      case 'Success': return 'done';
      case 'Error':   return 'cancel';
      case 'Warn':    return 'warning';
      case 'Info':    return 'info';
      default:        return '';
    }
  }
}
