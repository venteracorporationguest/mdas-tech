import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getPerformanceBySymbol(symbol: string): Observable<string> {
    const url = `${environment.baseURL}companies/performance?company=${symbol}`;
    return this.http.get<string>(url);
  }
}
