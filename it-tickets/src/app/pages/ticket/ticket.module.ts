import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateTicket } from "./components/create-ticket/create-ticket";
import { Tickets } from './components/tickets/tickets'; 
import { TicketDetail } from "./components/ticket-detail/ticket-detail";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CreateTicket,
    Tickets,
    TicketDetail,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "create", component: CreateTicket }, 
      { path: "tickets", component: Tickets },
      { path: "detail", component: TicketDetail }
    ]),

    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,  
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class TicketModule {}
