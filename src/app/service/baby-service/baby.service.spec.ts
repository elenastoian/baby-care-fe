import { TestBed } from '@angular/core/testing';

import { BabyService } from './baby.service';

describe('BabyService', () => {
  let service: BabyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
