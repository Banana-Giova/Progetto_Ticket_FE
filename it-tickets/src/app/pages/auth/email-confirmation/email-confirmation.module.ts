import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailConfirmation } from './email-confirmation';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ EmailConfirmation ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: EmailConfirmation }
    ])
  ],
  exports: [ EmailConfirmation ]
})
export class EmailConfirmationModule { }
