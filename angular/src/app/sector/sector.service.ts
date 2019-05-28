import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CompanyData} from '../shared/domain/company-data';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  getIndustryBreakdown(sector: string): Observable<string> {
    const url = `${environment.baseURL}sector/breakdown/${sector}`;
    return this.http.get<string>(url);
  }

  getIndustriesInSector(sector: string): Observable<CompanyData[]> {
    const url = `${environment.baseURL}sector/industries?sector=${sector}`;
    return this.http.get<CompanyData[]>(url);
  }

  getSectorPerformance(sector: string): Observable<string> {
    const url = `${environment.baseURL}performance/sector/${sector}`;
    return this.http.get<string>(url);
  }
}
