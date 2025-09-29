import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserNotification } from '../../../../core/notifications/models/notification.model';
import { UserNotificationService } from '../../../../core/notifications/user-notification.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.html',
  styleUrls: ['./notification-detail.css'],
  standalone: false
})
export class NotificationDetail {
  notification: UserNotification;
  marking = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) rawData: any,
    private dialogRef: MatDialogRef<NotificationDetail>,
    private userNotif: UserNotificationService
  ) {
    // rawData può essere { notification: n } oppure direttamente l'oggetto; gestisco entrambi i casi
    const payload = rawData?.notification ?? rawData;
    this.notification = new UserNotification(payload);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  markAsRead(): void {
    if (!this.notification || this.notification.read) {
      // se è già letta non facciamo nulla (protezione)
      this.dialogRef.close(false);
      return;
    }

    this.marking = true;

    // chiama il service (il service si occupa di toast / aggiornare gli stream)
    this.userNotif.markAsRead(this.notification.id);

    // Aggiorno lo stato locale per immediate feedback (opzionale)
    this.notification.read = true;
    this.marking = false;

    // Chiudo la dialog segnalando che è stata marcata come letta
    this.dialogRef.close(true);
  }
}
