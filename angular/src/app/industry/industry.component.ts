import {Component, Input, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {SharedSectorService} from '../shared/shared-sector.service';
import {DetailedData} from '../shared/domain/detailed-data';
import {IndustryService} from './industry.service';
import {CHART_COLORS} from '../shared/chart-colors';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {

  @Input() industry: DetailedData;
  performanceComparison$: Observable<any>;

  CHART_CONFIG = {
    barChartView: [900, 450],
    barChartShowXAxis: true,
    barChartShowYAxis: true,
    barChartGradient: false,
    barChartShowLegend: true,
    barChartShowXAxisLabel: true,
    barChartShowYAxisLabel: true,
    barChartAutoScale: true,
    domain: CHART_COLORS

  };

  constructor(private industryService: IndustryService,
              private sharedSectorService: SharedSectorService) { }

  ngOnInit() {
    this.performanceComparison$ = combineLatest([
        this.industryService.getIndustryPerformance(this.industry.name),
        this.sharedSectorService.getSectorPerformance()
      ]
    ).pipe(
        take(1),
        map(val => [this.calculateMetrics(val[0]),this.calculateMetrics(val[1][0])])
    );
  }

  calculateMetrics(input: any): Object {
    const series = input.series;
    const calculations = [
      {name: 'Worst Annual % Change', func: this.calculateMin},
      {name: 'Average Annual % Change', func: this.calculateMean},
      {name: 'Best Annual % Change', func: this.calculateMax}
    ];

    let results = [];
    for (let calculation of calculations) {
      const result = calculation.func(series);
      results.push(this.formatCalculations(result, calculation.name));
    }

    return {name: input.name, series: [results[0],results[1],results[2]]};
  }

  private calculateMean(series: any[]): number {
    let sum = 0;
    for(let record of series) {
      sum += record.value;
    }

    if (sum === 0) {
      return 0;
    }

    return sum / series.length;
  }

  private calculateMin(series: any[]): number {
    let min = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < series.length; i++) {
      if (min > series[i].value) {
        min = series[i].value;
      }
    }

    return min !== Number.MAX_SAFE_INTEGER ? min : 0;
  }

  private calculateMax(series: any[]): number {
    let max = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < series.length; i++) {
      if (max < series[i].value) {
        max = series[i].value;
      }
    }

    return max !== Number.MIN_SAFE_INTEGER ? max : 0;
  }

  private formatCalculations(input: any, label: string): any {
    return {name: label, value: input};
  }

}
