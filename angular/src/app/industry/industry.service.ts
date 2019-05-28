import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CompanyData} from '../shared/domain/company-data';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private http: HttpClient) { }

  getIndustryPerformance(industry: string): Observable<string> {
    const url = `${environment.baseURL}performance/industry/${industry}`;
    return this.http.get<string>(url);
  }

  getCompaniesInIndustry(industry: string): Observable<CompanyData[]> {
    const url = `${environment.baseURL}industry/companies?industry=${industry}`;
    return this.http.get<CompanyData[]>(url);
  }
}
