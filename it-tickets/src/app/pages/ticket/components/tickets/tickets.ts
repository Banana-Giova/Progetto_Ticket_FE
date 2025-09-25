import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicket } from '../create-ticket/create-ticket';
import { TicketModel } from '../../models/ticket.model';
import { UserAPIService } from '../../../auth/services/user.api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryModel } from '../../models/category.model';
import { BehaviorSubject, catchError, forkJoin, of, tap } from 'rxjs';
import { TicketDetail } from '../ticket-detail/ticket-detail';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit{

  tickets: TicketModel[] = [];
  displayedColumns: string[] = ['title','category', 'status','is_priority','details' ];
  totalTickets = 0;
  pageSize = 10;
  pageIndex = 0;
  // isAllTickets: boolean = false;

  searchKeyword: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';

  status: string[] = [];
  categories: CategoryModel[] = [];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog: MatDialog, private service: UserAPIService, private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.ticketService.isGestione$.subscribe(isAllTickets => {
      this.pageIndex = 0; 
      this.loadTickets(isAllTickets);
    });

    this.loadFilters();
  }

  openDialog(): void {
    this.dialog.open(CreateTicket)
     .afterClosed()
     .pipe(
       tap(() => this.loadTickets(this.ticketService.getIsGestione()))
    )
    .subscribe();
 }

  openTicketDetails(ticket: TicketModel): void {
      console.log('Categoria:', ticket.categoryName);
      console.log('priority', ticket.is_priority);
    
    this.dialog.open(TicketDetail, {
      width: "600px",
      height: "500px",
      autoFocus: false,
      data: {id: ticket.id  }
    }).afterClosed().pipe(
      tap(() => this.loadTickets(this.ticketService.getIsGestione()))
    ).subscribe();
  }

  
  loadTickets(isAllTickets:boolean) {
    this.service.getTickets$(this.pageIndex, this.pageSize, isAllTickets, this.searchKeyword, this.selectedCategory, this.selectedStatus
   ).pipe(
      tap(data => {
        this.tickets = data.content;
        this.totalTickets = data.totalElements;
        console.log('ticket presenti:', data.totalElements);
        console.log('Ticket caricati:', data.content);
      }),
      catchError(err => {
        console.error('Errore nel caricamento ticket:', err);
        // catcherror deve tornare necessariamente un observable, non può essere void
        return of({ content: [], totalElements: 0 });
      })
    ).subscribe();
}

  loadFilters(): void {
    forkJoin({
      categories: this.service.getCategories$(),
      status: this.service.getStatus$()
    }).subscribe(({categories, status}) => {
      this.categories = categories;
      this.status = status;
    });
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTickets(this.ticketService.getIsGestione());
  }

  private searchTimeout: any;
  searched: boolean = false;

  onFilterChange(value: string): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout= setTimeout(() => {
      this.pageIndex = 0; // resetta la pagina quando cambia un filtro
      this.loadTickets(this.ticketService.getIsGestione());
      this.searched = true;
    }, 500);

  }
  
}