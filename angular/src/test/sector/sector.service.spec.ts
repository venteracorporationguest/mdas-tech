import { TestBed } from '@angular/core/testing';

import { SectorService } from '../../app/sector/sector.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SectorService = TestBed.get(SectorService);
    expect(service).toBeTruthy();
  });
});
