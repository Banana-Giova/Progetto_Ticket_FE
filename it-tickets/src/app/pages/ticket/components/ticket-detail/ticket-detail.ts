import { Component, DebugElement, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TicketModel } from '../../models/ticket.model';
import { UserAPIService } from '../../../auth/services/user.api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../shared/toasts/notification.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: false,
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail implements OnInit {

  ticket = new TicketModel;
  userIsOperator = false;
  newStatus?: string;
  updatedStatus: boolean = false;
  status: string[] = [];
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }, private dialogRef: MatDialogRef<TicketDetail>, private service: UserAPIService, private authService: AuthService, private notify: NotificationService) { }


  ngOnInit(): void {
    this.userIsOperator = this.authService.isOperator;
    this.service.getTicketById$(this.data.id).subscribe(ticket => {
        this.ticket = ticket;
        this.newStatus = ticket.status;
        console.log('ticket aggiornato:', ticket);
      });

      this.service.getStatus$().subscribe({
        next: statusList => {
          this.status = statusList
        },
      error: err => console.error("errore caricamento stati", err)

    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    
  }

  updateDescription(): void {
    this.service.updateDescription$(this.ticket.id!, this.ticket.description)
    .subscribe({
      next: ticketUpdated => {
        this.ticket = ticketUpdated;
        this.notify.success("Descrizione modificata con successo")
      },
      error: err => this.notify.error("non puoi modificare la descrizione di questo ticket")
    });
  }

  updateStatus(): void {
    this.service.updateStatus$(this.ticket.id!, this.newStatus!)
    .subscribe({
      next: ticketUpdated => {
        this.ticket =  ticketUpdated;
        this.updatedStatus = false;
        this.notify.success("Stato modificata con successo")

      },
      error: err => this.notify.error ("non puoi modificare lo stato ")
    })
  }




}
