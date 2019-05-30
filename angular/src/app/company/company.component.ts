import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from './company.service';
import {Observable, zip} from 'rxjs';
import * as shape from 'd3-shape';
import {SharedIndustryService} from '../shared/shared-industry.service';
import {DetailedData} from '../shared/domain/detailed-data';
import {CHART_COLORS} from '../shared/chart-colors';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input() company: DetailedData;
  performanceComparison$: Observable<[string, string]>;

  CHART_CONFIG = {
    lineChartView: [900, 450],
    lineChartShowXAxis: true,
    lineChartShowYAxis: true,
    lineChartGradient: false,
    lineChartShowLegend: true,
    lineChartShowXAxisLabel: true,
    lineChartShowYAxisLabel: true,
    lineChartAutoScale: true,
    lineChartLineInterpolation: shape.curveBasis,
    domain: CHART_COLORS
  };

  constructor(private companyService: CompanyService,
              private sharedIndustryService: SharedIndustryService) { }

  ngOnInit() {
    const companyPerformance$ = this.companyService.getPerformanceBySymbol(this.company.symbol);
    const industryPerformance$ = this.sharedIndustryService.getIndustryPerformance();
    this.performanceComparison$ = zip(companyPerformance$, industryPerformance$);
  }
}
