import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryComponent } from '../../app/industry/industry.component';
import {SharedIndustryService} from '../../app/shared/shared-industry.service';
import {SharedSectorService} from '../../app/shared/shared-sector.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('IndustryComponent', () => {
  let component: IndustryComponent;
  let fixture: ComponentFixture<IndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SharedIndustryService, SharedSectorService],
      declarations: [ IndustryComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryComponent);
    component = fixture.componentInstance;
    component.industry = {name: 'Test', symbol: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the lowest value, mean value and highest value and format data', () => {
    const input = {name: 'Test', series: [{name: '2008', value: 20}, {name: '2009', value: 35}, {name: '2010', value: 29}]};

    const result = component.calculateMetrics(input);

    expect(result).toEqual({name: 'Test', series: [{name: 'Worst Annual % Change', value: 20},{name: 'Average Annual % Change', value: 28},{name: 'Best Annual % Change', value: 35}]});
  });

});
