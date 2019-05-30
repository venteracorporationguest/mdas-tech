import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {DetailedData} from '../shared/domain/detailed-data';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  getIndustryBreakdown(sector: string): Observable<string> {
    const url = `${environment.baseURL}sectors/breakdown?sector=${sector}`;
    return this.http.get<string>(url);
  }

  getIndustriesInSector(sector: string): Observable<DetailedData[]> {
    const url = `${environment.baseURL}sectors/industries?sector=${sector}`;
    return this.http.get<DetailedData[]>(url);
  }

  getSectorPerformance(sector: string): Observable<string> {
    const url = `${environment.baseURL}sectors/performance?sector=${sector}`;
    return this.http.get<string>(url);
  }
}
