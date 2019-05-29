import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { CompanyComponent } from '../../app/company/company.component';
import {CompanyService} from '../../app/company/company.service';
import {SharedIndustryService} from '../../app/shared/shared-industry.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyComponent ],
      imports: [ HttpClientTestingModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    component.company = {name: 'Test Corp', symbol: 'TST'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collect data for stock and industry OnInit', inject([CompanyService, SharedIndustryService],
      (companyService: CompanyService, sharedIndustryService: SharedIndustryService) => {
    spyOn(companyService, 'getPerformanceBySymbol').and.returnValue(of('{stock}'));
    spyOn(sharedIndustryService, 'getIndustryPerformance').and.returnValue(of('{industry}'));

    component.ngOnInit();

    component.performanceComparison$.subscribe(result => {
      expect(result).toEqual('{stock}{industry}');
    });
  }));

});
