import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedSectorService {

  private sectorPerformance: BehaviorSubject<string> = new BehaviorSubject(undefined);
  private sectors: BehaviorSubject<string[]> = new BehaviorSubject(undefined);

  constructor() { }

  updateSectorPerformance(newPerformance: string): void {
    this.sectorPerformance.next(newPerformance);
  }

  getSectorPerformance(): Observable<string> {
    return this.sectorPerformance.asObservable();
  }

  updateSectors(sectors: string[]): void {
    this.sectors.next(sectors);
  }

  getSectors(): Observable<string[]> {
    return this.sectors.asObservable();
  }

}
