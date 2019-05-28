import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { IndustryDashboardComponent } from '../../app/industry/industry-dashboard.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IndustryService} from '../../app/industry/industry.service';
import {SharedIndustryService} from '../../app/shared/shared-industry.service';
import {of} from 'rxjs';

describe('IndustryDashboardComponent', () => {
  let component: IndustryDashboardComponent;
  let fixture: ComponentFixture<IndustryDashboardComponent>;

  const partialIndustryService: Partial<IndustryService> = {
    getIndustryPerformance: industry => of(''),
    getCompaniesInIndustry: industry => of([])
  };

  const partialSharedIndustryService: Partial<SharedIndustryService> = {
    updateIndustryPerformance: newPerformanceResult => of('')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryDashboardComponent ],
      providers: [
        {provide: IndustryService, useValue: partialIndustryService},
        {provide: SharedIndustryService, useValue: partialSharedIndustryService}
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(partialIndustryService, 'getCompaniesInIndustry').and.returnValue([].fill({name: 'Test', symbol: 'TST'}, 0, 10));
    fixture = TestBed.createComponent(IndustryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should not load another batch of companies',() => {
    component.loadNextBatch();

    component.companiesInIndustry$.subscribe(result => expect(result.length).toEqual(5));
  });

  xit('should load next batch of companies',() => {
    component.loadNextBatch();

    component.companiesInIndustry$.subscribe(result => expect(result.length).toEqual(10));
  });
});
