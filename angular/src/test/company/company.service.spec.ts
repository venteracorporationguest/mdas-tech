import {inject, TestBed} from '@angular/core/testing';

import { CompanyService } from '../../app/company/company.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('CompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule(
      {imports: [HttpClientTestingModule],
          providers: [CompanyService]},
      )
  );

  it('should be created', () => {
    const service: CompanyService = TestBed.get(CompanyService);
    expect(service).toBeTruthy();
  });

  it('should call http://localhost:8000/api/companies/performance?company=test',
      inject([HttpClient, CompanyService], (httpMock, companyService) => {
          spyOn(httpMock, 'get');

          companyService.getPerformanceBySymbol('test');

          expect(httpMock.get).toHaveBeenCalledWith('http://localhost:8000/api/companies/performance?company=test');
  }));
});
