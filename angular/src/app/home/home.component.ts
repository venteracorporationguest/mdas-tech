import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {CHART_COLORS} from '../shared/chart-colors';
import {SharedSectorService} from '../shared/shared-sector.service';
import {SharedIndustryService} from '../shared/shared-industry.service';
import {Counts} from '../shared/domain/counts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sectors$: Observable<Counts[]>;

  CHART_CONFIG = {
    chartView: [1000, 650],
    chartGradient: false,
    lineChartShowLegend: true,
    domain: CHART_COLORS
  };

  constructor(private homeService: HomeService,
              private sharedSectorService: SharedSectorService,
              private sharedIndustryService: SharedIndustryService,
              private router: Router) { }

  ngOnInit() {
    this.sharedIndustryService.updateIndustries(undefined);
    this.homeService.getAllSectors().subscribe(
        result => {
          this.sharedSectorService.updateSectors(result.map(val => val.name));
          this.sectors$ = of(result);
        }
    );
  }

  formatLabel(section): string {
    return `<span class="mat-display-1">${section.label}<br><small class="number-card-label">Industries In Sector</small></span>`;
  }

  onIndustryClicked(event): void {
    this.router.navigate(['Sector', event.name]);
  }
}
