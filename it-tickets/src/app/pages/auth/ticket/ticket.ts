import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from '../services/user.api.service';
import { CategoryModel } from '../catgoryModels/category.model';
import { TicketModel } from './models/ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: false,
  templateUrl: './ticket.html',
  styleUrl: './ticket.css'
})
export class Ticket implements OnInit{
  model: TicketModel = new TicketModel;
  ticketform: FormGroup; //è il modulo per creare il ticket
  categories: CategoryModel[] = [];

  constructor(private service: UserAPIService, private fb: FormBuilder) { //form builder è per creare formgroup
     this.ticketform = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [null, Validators.required],
      is_priority: [false]
    });

  }


  ngOnInit(): void {
    const model = new CategoryModel(); // può essere anche vuoto
    this.service.getCategories$(model).subscribe({
      next: data => {
        this.categories = data;    //Se va bene (next:), salva le categorie nell'array categories altrimenti lancia l'errore
        console.log('Categorie caricate:', data);
      },
      error: err => {
        console.error('Errore nel caricamento categorie:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.ticketform.valid) {
      const ticket = new TicketModel(this.ticketform.value); //se tutti i campi nel form sono validi, crea un oggetto ticket model
      this.service.addTicket$(ticket).subscribe({
        next: response => {
          console.log('Ticket creato:', response);
          alert('Ticket creato con successo!'); //se la creazione è avvenuta stampa il messaggio
          this.ticketform.reset(); //riporta il form allo stato iniziale
        },
        error: err => {
          console.error('Errore durante la creazione del ticket:', err);  //altrimenti lancia l'errore
          alert('Errore nella creazione del ticket');
        }
      });
    }
  }
}
