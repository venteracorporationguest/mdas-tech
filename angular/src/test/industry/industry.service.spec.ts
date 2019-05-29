import {inject, TestBed} from '@angular/core/testing';

import { IndustryService } from '../../app/industry/industry.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('IndustryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: IndustryService = TestBed.get(IndustryService);
    expect(service).toBeTruthy();
  });

  it('should call Industry Performance endpoint with Test in path',
      inject([IndustryService, HttpClient], (service: IndustryService, http: HttpClient) => {
        spyOn(http, 'get').and.stub();
        service.getIndustryPerformance('Test');

        expect(http.get).toHaveBeenCalledWith('http://localhost:8080/performance/industry/Test');
  }));

  it('should call list of companies in Industry endpoitn with test as param',
      inject([IndustryService, HttpClient], (service: IndustryService, http: HttpClient) => {
        spyOn(http, 'get').and.stub();
        service.getCompaniesInIndustry('Test');

        expect(http.get).toHaveBeenCalledWith('http://localhost:8080/industry/companies?industry=Test');
  }));
});
