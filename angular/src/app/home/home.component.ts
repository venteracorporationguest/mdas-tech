import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HomeService} from './home.service';
import {Router} from '@angular/router';
import {CHART_COLORS} from '../shared/chart-colors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sectors$: Observable<string>;

  CHART_CONFIG = {
    chartView: [1000, 650],
    chartGradient: false,
    lineChartShowLegend: true,
    domain: CHART_COLORS
  };

  constructor(private homeService: HomeService,
              private router: Router) { }

  ngOnInit() {
    this.sectors$ = this.homeService.getAllSectors();
  }

  formatLabel(section): string {
    return `<span class="mat-display-1">${section.label}<br><small class="number-card-label">Industries In Sector</small></span>`;
  }

  onIndustryClicked(event): void {
    this.router.navigate(['Sector', event.name]);
  }
}
