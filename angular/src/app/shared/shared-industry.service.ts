import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedIndustryService {

  private industrySubject: BehaviorSubject<string> = new BehaviorSubject('Technology');
  private industryPerformanceSubject: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor() { }

  updateIndustry(newIndustry: string): void {
    this.industryPerformanceSubject.next(newIndustry);
  }

  getIndustry(): Observable<string> {
    return this.industrySubject.asObservable();
  }

  updateIndustryPerformance(newPerformanceResult: string): void {
    this.industryPerformanceSubject.next(newPerformanceResult);
  }

  getIndustryPerformance(): Observable<string> {
    return this.industryPerformanceSubject.asObservable();
  }
}
