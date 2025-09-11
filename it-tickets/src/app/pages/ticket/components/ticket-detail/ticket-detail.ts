import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TicketModel } from '../../models/ticket.model';
import { UserAPIService } from '../../../auth/services/user.api.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: false,
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail implements OnInit {

  ticket = new TicketModel;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number }, private dialogRef: MatDialogRef<TicketDetail>, private service: UserAPIService) { }


  ngOnInit(): void {
    this.service.getTicketById$(this.data.id).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        console.log('ticket aggiornato:', ticket);
      },
      error: (err) => {
        console.log("errore agg ticket:", err);
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }




}
