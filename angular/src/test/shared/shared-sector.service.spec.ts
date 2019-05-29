import { TestBed } from '@angular/core/testing';

import { SharedSectorService } from '../../app/shared/shared-sector.service';

describe('SharedSectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedSectorService = TestBed.get(SharedSectorService);
    expect(service).toBeTruthy();
  });
});
