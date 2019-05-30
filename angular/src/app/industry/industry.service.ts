import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {DetailedData} from '../shared/domain/detailed-data';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  constructor(private http: HttpClient) { }

  getIndustryPerformance(industry: string): Observable<string> {
    const url = `${environment.baseURL}industries/performance?industry=${industry}`;
    return this.http.get<string>(url);
  }

  getCompaniesInIndustry(industry: string): Observable<DetailedData[]> {
    const url = `${environment.baseURL}industries/companies?industry=${industry}`;
    return this.http.get<DetailedData[]>(url);
  }
}
