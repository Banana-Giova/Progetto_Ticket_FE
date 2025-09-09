import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateTicket } from "./components/create-ticket/create-ticket";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Tickets } from './components/tickets/tickets'; 
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    CreateTicket,
    Tickets
  ],
  imports: [
    CommonModule,
    MatFormField,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatAccordion,
    MatCheckboxModule,  
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginator,
    RouterModule.forChild([
      {
        path: "create",
        component: CreateTicket
      }, 
      {
        path: "tickets",
        component: Tickets
      }
    ])

  ]
})
export class TicketModule {
}