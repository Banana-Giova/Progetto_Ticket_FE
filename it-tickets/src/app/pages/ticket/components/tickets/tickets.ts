import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicket } from '../create-ticket/create-ticket';
import { TicketModel } from '../../models/ticket.model';
import { UserAPIService } from '../../../auth/services/user.api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit{

  tickets: TicketModel[] = [];
  displayedColumns: string[] = ['title', 'description', 'category', 'is_priority', 'status'];
  totalTickets = 0;
  pageSize = 10;
  pageIndex = 0;

  searchKeyword: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';

  status: string[] = [];
  categories: CategoryModel[] = [];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog: MatDialog, private service: UserAPIService, 
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadFilters();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTicket);
    dialogRef.afterClosed().subscribe(()=>{
      this.loadTickets()
    });
  }

  loadTickets(){
    this.service.getTickets$(this.pageIndex, this.pageSize, this.searchKeyword, this.selectedCategory, this.selectedStatus).subscribe({ //quando chiude il dialog ricaricara i ticket con lo stesso metodo di sopra
        next: (data) => {
          this.tickets = data.content;    //Se va bene (next:), salva le categorie nell'array tickets altrimenti lancia l'errore
          this.totalTickets = data.totalElements;
          console.log('ticket presenti:', data.totalElements)
          console.log('Ticket caricati:', data.content);
        },
        error: err => {
          console.error('Errore nel caricamento ticket:', err);
        }
      });
  }

  loadFilters(): void {
    this.service.getCategories$().subscribe(data => this.categories = data);
    this.service.getStatus$().subscribe(data => this.status = data);
    console.log('stati', this.status)
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTickets();
  }

  onFilterChange(): void {
    this.pageIndex = 0; // resetta la pagina quando cambia un filtro
    this.loadTickets();
  }

//   onSearch(keyword: string): void {
//   this.searchKeyword = keyword;
//   this.pageIndex = 0; // resetta alla prima pagina quando fai una nuova ricerca
//   this.loadTickets();
// }


  
}
