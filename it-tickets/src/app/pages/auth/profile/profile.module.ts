import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Profile } from './profile';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TicketChartModule } from '../../ticket/components/ticket-chart/ticket-chart.module';

@NgModule({
  declarations: [ Profile ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    TicketChartModule,
    RouterModule.forChild([
      { path: '', component: Profile }
    ])
  ],
  exports: [ Profile ]
})
export class ProfileModule { }
