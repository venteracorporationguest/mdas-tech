import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SectorService} from './sector.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyData} from '../shared/domain/company-data';
import {SharedSectorService} from '../shared/shared-sector.service';
import {CHART_COLORS} from '../shared/chart-colors';

@Component({
  selector: 'app-sector',
  templateUrl: './sector-dashboard.component.html',
  styleUrls: ['./sector-dashboard.component.scss']
})
export class SectorDashboardComponent implements OnInit {

  sector: string;
  sectorBreakdown$: Observable<string>;
  industriesInSector$: BehaviorSubject<CompanyData[]> = new BehaviorSubject(undefined);

  private fullIndustryList: CompanyData[];
  private batchSize = 5;
  private industriesLoaded = 0;

  CHART_CONFIG = {
    chartView: [900, 450],
    chartGradient: false,
    lineChartShowLegend: true,
    domain: CHART_COLORS
  };

  constructor(private sectorService: SectorService,
              private sharedSectorService: SharedSectorService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sector = this.route.snapshot.paramMap.get('sector');
    this.sectorService.getSectorPerformance(this.sector).subscribe(
        result => {
          this.sharedSectorService.updateSectorPerformance(result);
        });
    this.sectorBreakdown$ = this.sectorService.getIndustryBreakdown(this.sector);
    this.sectorService.getIndustriesInSector(this.sector).subscribe(
        result => {
          this.fullIndustryList = result;
          this.industriesInSector$.next(result.slice(0, this.batchSize));
          this.industriesLoaded = this.batchSize;
        });
  }

  formatLabel(section): string {
    return `<span class="mat-display-1">${section.label}<br><small class="number-card-label">Companies In Industry</small></span>`;
  }

  onIndustryClicked(event): void {
    this.router.navigate(['Industry', event.name]);
  }

  loadNextBatch(): void {
    if (this.industriesLoaded === this.fullIndustryList.length) {
      return;
    }

    this.industriesLoaded += this.batchSize;
    this.industriesInSector$.next(this.fullIndustryList.slice(0, this.industriesLoaded));
  }

  trackByIdx(index: number): number {
    return index;
  }
}
