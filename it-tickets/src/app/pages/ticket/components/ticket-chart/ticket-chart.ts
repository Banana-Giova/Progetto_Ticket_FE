import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { UserAPIService } from '../../../auth/services/user.api.service';

interface ChartItem { name: string; value: number; }

@Component({
  selector: 'app-ticket-chart',
  standalone: false,
  templateUrl: './ticket-chart.html',
  styleUrls: ['./ticket-chart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketChart {
  pieData$!: Observable<ChartItem[]>;

  view: [number, number] = [500, 300];
  showLegend = true;
  showLabels = true;
  animations = true;
  legTitle = "";
  customColors = [
  { name: 'Da fare', value: '#ffc107' }, // #007bff per varietà azzurra qui, e giallo sotto
  { name: 'In lavorazione', value: 'orange' },
  { name: 'Respinti', value: '#dc3545' },
  { name: 'Completati', value: '#28a745' }
];


  constructor(private ticketApi: UserAPIService) {
    this.pieData$ = this.ticketApi.getChart$().pipe(
      map((resp: any) => {
        const stats: Record<string, number> = resp?.ticketStats ?? resp ?? {};
        return Object.entries(stats || {})
          .map(([k, v]) => ({ name: this.humanLabel(k), value: Number(v) || 0 }))
          .sort((a, b) => b.value - a.value);
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(err => {
        console.error('Errore caricando dati chart', err);
        return of([] as ChartItem[]);
      })
    );
  }

  private humanLabel(statusKey: string): string {
    switch (statusKey) {
      case 'TO_DO': return 'Da fare';
      case 'IN_PROGRESS': return 'In lavorazione';
      case 'REJECTED': return 'Respinti';
      case 'COMPLETED': return 'Completati';
      default:
        return statusKey
          .toLowerCase()
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
    }
  }
}
