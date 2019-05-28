import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSectorService {

  private sectorPerformance: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor() { }

  updateSectorPerformance(newPerformance: string): void {
    this.sectorPerformance.next(newPerformance);
  }

  getSectorPerformance(): Observable<string> {
    return this.sectorPerformance.asObservable();
  }
}
