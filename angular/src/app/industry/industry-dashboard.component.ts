import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IndustryService} from './industry.service';
import {SharedIndustryService} from '../shared/shared-industry.service';
import {DetailedData} from '../shared/domain/detailed-data';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-industry-dashboard',
  templateUrl: './industry-dashboard.component.html',
  styleUrls: ['./industry-dashboard.component.scss']
})
export class IndustryDashboardComponent implements OnInit {

  @Input() industry: string;
  companiesInIndustry$: BehaviorSubject<DetailedData[]> = new BehaviorSubject(undefined);

  private fullCompanyList: DetailedData[];
  private batchSize = 5;
  private companiesLoaded = 0;

  constructor(private industryService: IndustryService,
              private sharedIndustryService: SharedIndustryService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
        result => {
          this.industry = result.get('industry');
          this.industryService.getIndustryPerformance(this.industry)
              .subscribe(result => {
                  this.sharedIndustryService.updateIndustryPerformance(result);
              }, error => {
                  this.sharedIndustryService.updateIndustryPerformance(undefined);
              });
          this.industryService.getCompaniesInIndustry(this.industry).subscribe(
              result => {
                this.fullCompanyList = result;
                this.companiesInIndustry$.next(result.slice(0, this.batchSize));
                this.companiesLoaded = this.batchSize;
              }, error => {
                  this.companiesInIndustry$.next(undefined);
              }
          );
        });
  }

  loadNextBatch(): void {
    if (this.companiesLoaded === this.fullCompanyList.length) {
      return;
    }

    this.companiesLoaded += this.batchSize;
    this.companiesInIndustry$.next(this.fullCompanyList.slice(0, this.companiesLoaded));
  }

  trackByIdx(index: number): number {
    return index;
  }
}
