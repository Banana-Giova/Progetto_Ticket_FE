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

  view: [number, number] = [500, 250];
  showLegend = false;
  showLabels = true;
  animations = true;
  legTitle = "";

  yAxisTicks: number[] = [];
  yScaleMin = 0;
  yScaleMax: number = 0;
  roundDomains = false;

  customColors = [
    { name: 'Da fare', value: '#D6D6D6' },
    { name: 'In lavorazione', value: 'rgb(62, 107, 180)' },
    { name: 'Respinti', value: '#F65C51' },
    { name: 'Completati', value: '#5CD65C' }
  ];

  constructor(private ticketApi: UserAPIService) {
    this.chartData$ = this.ticketApi.getChart$().pipe(
      map((resp: any) => {
        const rawStats: Record<string, number> = resp?.ticketStats ?? resp ?? {};

        const ALL_STATUSES = ['TO_DO', 'IN_PROGRESS', 'REJECTED', 'COMPLETED'];

        const stats: Record<string, number> = Object.fromEntries(
          ALL_STATUSES.map(k => [k, Number(rawStats?.[k]) || 0])
        );

        const total = Object.values(stats).reduce((s, v) => s + v, 0);

        const items: ChartItem[] = ALL_STATUSES.map(k => {
          const val = stats[k];
          return {
            name: this.humanLabel(k),
            value: val,
            extra: { percent: total > 0 ? (val / total) * 100 : 0 }
          } as ChartItem;
        });

        const counts = items.map(i => i.value);
        const { yAxisTicks, yScaleMax } = this.decideYAxisTicks(counts);

        this.yAxisTicks = yAxisTicks;
        this.yScaleMax = yScaleMax;
        this.yScaleMin = 0;
        this.roundDomains = false;

        return items;
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(err => {
        console.error('Errore caricando dati chart', err);
        return of([] as ChartItem[]);
      })
    );
  }

  decideYAxisTicks = (counts: number[]): { yAxisTicks: number[]; yScaleMax: number } => {
    const values = (counts || []).map(v => Math.max(0, Math.floor(Number(v) || 0)));
    const maxVal = values.length ? Math.max(...values) : 0;

    if (maxVal === 0) return { yAxisTicks: [0, 1], yScaleMax: 1 };

    const SMALL_THRESHOLD = 4;
    const SMALL_TICKS = 3;
    const DEFAULT_TICKS = 5;

    if (maxVal <= SMALL_THRESHOLD) {
      const step = Math.max(1, Math.ceil(maxVal / (SMALL_TICKS - 1)));
      const ticks: number[] = [];
      for (let i = 0; i < SMALL_TICKS; i++) ticks.push(i * step);
      while (ticks[ticks.length - 1] < maxVal) ticks.push(ticks[ticks.length - 1] + step);
      const uniq = Array.from(new Set(ticks)).sort((a, b) => a - b);
      return { yAxisTicks: uniq, yScaleMax: uniq[uniq.length - 1] };
    }

    const step = Math.max(1, Math.ceil(maxVal / (DEFAULT_TICKS - 1)));
    const ticks = Array.from({ length: DEFAULT_TICKS }, (_, i) => i * step);
    if (ticks[ticks.length - 1] < maxVal) ticks[ticks.length - 1] = Math.ceil(maxVal / step) * step;
    const uniq = Array.from(new Set(ticks)).sort((a, b) => a - b);
    return { yAxisTicks: uniq, yScaleMax: uniq[uniq.length - 1] };
  }

  yAxisTickFormatting = (v: number) => {
    if (v == null || isNaN(v)) return '';
    return Number(v).toFixed(0);
  };

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
