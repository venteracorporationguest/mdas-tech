import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IndustryService} from './industry.service';
import {SharedIndustryService} from '../shared/shared-industry.service';
import {CompanyData} from '../shared/domain/company-data';

@Component({
  selector: 'app-industry-dashboard',
  templateUrl: './industry-dashboard.component.html',
  styleUrls: ['./industry-dashboard.component.scss']
})
export class IndustryDashboardComponent implements OnInit {

  @Input() industryName: string = 'Technology';
  companiesInIndustry$: BehaviorSubject<CompanyData[]> = new BehaviorSubject(undefined);

  private fullCompanyList: CompanyData[];
  private batchSize = 5;
  private companiesLoaded = 0;

  constructor(private industryService: IndustryService,
              private sharedIndustryService: SharedIndustryService) {
  }

  ngOnInit() {
    this.industryService.getIndustryPerformance(this.industryName)
        .subscribe(result => this.sharedIndustryService.updateIndustryPerformance(result));
    this.industryService.getCompaniesInIndustry(this.industryName).subscribe(
        result => {
          this.fullCompanyList = result;
          this.companiesInIndustry$.next(result.slice(0, this.batchSize));
          this.companiesLoaded = this.batchSize;
        }
    );
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
