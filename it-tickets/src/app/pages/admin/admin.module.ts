import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserDetail } from "./user-detail/user-detail";

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
import { UsersList } from "./users-list/users-list";

@NgModule({
  declarations: [
    UsersList,
    UserDetail,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "users-list", component: UsersList },
      { path: "detail", component: UserDetail }
    ]),

    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCheckboxModule,  
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class AdminModule {}
