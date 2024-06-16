import { TestBed } from '@angular/core/testing';

import { BabyCareTrackerService } from './baby-care-tracker.service';

describe('BabyCareTrackerService', () => {
  let service: BabyCareTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabyCareTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
