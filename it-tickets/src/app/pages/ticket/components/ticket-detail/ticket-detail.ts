import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TicketModel } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-detail',
  standalone: false,
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetail {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TicketModel, private dialogRef: MatDialogRef<TicketDetail>) {}

  

}
