import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicket } from '../create-ticket/create-ticket';
import { TicketModel } from '../../models/ticket.model';
import { UserAPIService } from '../../../auth/services/user.api.service';

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit{

  tickets: TicketModel[] = [];
  displayedColumns: string[] = ['title', 'description', 'category', 'is_priority'];

  constructor(private dialog: MatDialog, private service: UserAPIService, 
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTicket);
    dialogRef.afterClosed().subscribe(()=>{
      this.loadTickets()
    });
  }

  loadTickets(){
    this.service.getTickets$().subscribe({ //quando chiude il dialog ricaricara i ticket con lo stesso metodo di sopra
        next: data => {
          this.tickets = data;    //Se va bene (next:), salva le categorie nell'array categories altrimenti lancia l'errore
          console.log('Ticket caricati:', data);
        },
        error: err => {
          console.error('Errore nel caricamento ticket:', err);
        }
      });
  }


}
