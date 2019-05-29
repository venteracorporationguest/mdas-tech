import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedIndustryService {

  private industryPerformanceSubject: BehaviorSubject<string> = new BehaviorSubject(undefined);
  private industries: BehaviorSubject<string[]> = new BehaviorSubject(undefined);

  constructor() { }

  updateIndustryPerformance(newPerformanceResult: string): void {
    this.industryPerformanceSubject.next(newPerformanceResult);
  }

  getIndustryPerformance(): Observable<string> {
    return this.industryPerformanceSubject.asObservable();
  }

  updateIndustries(industries: string[]): void {
    this.industries.next(industries);
  }

  getIndustries(): Observable<string[]> {
    return this.industries.asObservable();
  }

}
