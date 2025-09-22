import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketChart } from './ticket-chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ TicketChart ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [ TicketChart ]
})
export class TicketChartModule {}
