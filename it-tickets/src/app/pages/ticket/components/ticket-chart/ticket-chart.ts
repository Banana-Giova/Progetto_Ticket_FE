import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { UserAPIService } from '../../../auth/services/user.api.service';

interface ChartItem {
  name: string;
  value: number;
  extra?: { percent: number };
  tooltipText?: string;
}

@Component({
  selector: 'app-ticket-chart',
  standalone: false,
  templateUrl: './ticket-chart.html',
  styleUrls: ['./ticket-chart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketChart {
  chartData$!: Observable<ChartItem[]>;

  // view ottimizzato per grafico verticale (aggiusta se vuoi dimensioni diverse)
  view: [number, number] = [500, 250];

  showLegend = false;
  showLabels = true;
  animations = true;
  legTitle = "";
  customColors = [
    { name: 'Da fare', value: '#D6D6D6' },
    { name: 'In lavorazione', value: 'rgb(62, 107, 180)' },
    { name: 'Respinti', value: '#F65C51' },
    { name: 'Completati', value: '#5CD65C' }
  ];

  // -------------------------------------------------------
  // Formattazione tick asse Y: mostra solo interi (es. "6" invece di "6.0")
  // Usa toFixed(0) -> arrotonda al numero intero più vicino.
  // Se preferisci troncare invece di arrotondare, sostituisci con Math.trunc(v).toString()
  // -------------------------------------------------------
  yAxisTickFormatting = (v: number) => {
    if (v == null || isNaN(v)) { return ''; }
    return Number(v).toFixed(0);
  };

  constructor(private ticketApi: UserAPIService) {
    this.chartData$ = this.ticketApi.getChart$().pipe(
      map((resp: any) => {
        const stats: Record<string, number> = resp?.ticketStats ?? resp ?? {};
        const total = Object.values(stats).reduce((s, v) => s + (Number(v) || 0), 0);

        return Object.entries(stats || {})
          .map(([k, v]) => {
            const val = Number(v) || 0;
            return {
              name: this.humanLabel(k),
              value: val,
              extra: { percent: total > 0 ? (val / total) * 100 : 0 }
            } as ChartItem;
          })
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
