import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllSectors(): Observable<string> {
    const url = `${environment.baseURL}sectors`;
    return this.http.get<string>(url);
  }
}
