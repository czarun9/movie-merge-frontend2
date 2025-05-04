import { TestBed } from '@angular/core/testing';

import { MovieStatusService } from './movie-status.service';

describe('MoviestatusService', () => {
  let service: MovieStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
