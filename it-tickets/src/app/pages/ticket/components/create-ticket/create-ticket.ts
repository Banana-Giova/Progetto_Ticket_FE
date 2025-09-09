import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from '../../../auth/services/user.api.service';
import { CategoryModel } from '../../models/category.model';
import { TicketModel } from '../../models/ticket.model';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-create-ticket',
  standalone: false,
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.css'
})
export class CreateTicket implements OnInit{
  model: TicketModel = new TicketModel;
  ticketform: FormGroup; //è il modulo per creare il ticket
  categories: CategoryModel[] = [];

  constructor(
    private service: UserAPIService, 
    private fb: FormBuilder, 
    private dialogRef: MatDialog
  ) 
  { //form builder è per creare formgroup
     this.ticketform = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [null],
      is_priority: [false],
      status: null
    });

  }


  ngOnInit(): void {
    this.service.getCategories$().
        pipe(
      tap(data => {
        this.categories = data;    //Se va bene salva le categorie nell'array categories altrimenti lancia l'errore
        console.log('Categorie caricate:', data);
      }), catchError (err => {
         console.error('Errore nel caricamento categorie:', err);
         return of({ content: [], totalElements: 0 });
      })
    ).subscribe()  
  }
    
  //   subscribe({
  //     next: data => {
  //       this.categories = data;    //Se va bene (next:), salva le categorie nell'array categories altrimenti lancia l'errore
  //       // console.log('Categorie caricate:', data);
  //     },
  //     error: err => {
  //       console.error('Errore nel caricamento categorie:', err);
  //     }
  //   });
  // }

 

  onSubmit(): void {
    if (this.ticketform.valid) {
      const ticket = new TicketModel(this.ticketform.value); //se tutti i campi nel form sono validi, crea un oggetto ticket model
      // console.log('Ticket inviato:', ticket);
      this.service.addTicket$(ticket).subscribe({
        next: response => {
          console.log('Ticket creato:', response);
          alert('Ticket creato con successo!'); //se la creazione è avvenuta stampa il messaggio
          this.ticketform.reset(); //riporta il form allo stato iniziale
          this.dialogRef.closeAll(); //chiude il modale alla fine dell'aggiunta
        },
        error: err => {
          console.error('Errore durante la creazione del ticket:', err);  //altrimenti lancia l'errore
          alert('Errore nella creazione del ticket');
        }
      });
    }
  }
}
