import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Counts} from '../shared/domain/counts';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllSectors(): Observable<Counts[]> {
    const url = `${environment.baseURL}sectors/list`;
    return this.http.get<Counts[]>(url);
  }
}
