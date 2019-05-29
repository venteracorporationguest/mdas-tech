import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import { SharedIndustryService } from '../../app/shared/shared-industry.service';

describe('SharedIndustryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedIndustryService = TestBed.get(SharedIndustryService);
    expect(service).toBeTruthy();
  });

  it('should update the performance data', inject([SharedIndustryService], (service: SharedIndustryService) => {
    const newString = 'test string';
    service.updateIndustryPerformance(newString);
    service.getIndustryPerformance().subscribe(result => expect(result).toEqual(newString));
  }));
});
