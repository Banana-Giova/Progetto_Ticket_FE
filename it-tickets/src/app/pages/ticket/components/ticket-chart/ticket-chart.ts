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

  view: [number, number] = [1060, 225];
  showLegend = false;
  showLabels = true;
  animations = true;
  legTitle = "";
  customColors = [
  { name: 'Da fare', value: '#D6D6D6' }, // #007bff per varietà azzurra qui, e giallo sotto
  { name: 'In lavorazione', value: '#007bff' },
  { name: 'Respinti', value: '#F65C51' },
  { name: 'Completati', value: '#5CD65C' }
  ];
  
  myTooltipText = (d: any) => {
    const nome = d.data?.name ?? d.name ?? '—';
    let total;
    
    let perc: number | null = null;

    if (typeof d.startAngle === 'number' && typeof d.endAngle === 'number') {
      perc = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
    } 
    if (perc == null && typeof d.value === 'number' && typeof (total) === 'number') {
      perc = (d.value / total) * 100;
    }

    if (perc != null) {
      return `Stato: ${nome}<br>${perc.toFixed(1)} %`;
    }

    return `Stato: ${nome}`;
  };


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
