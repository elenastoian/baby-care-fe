import { TestBed } from '@angular/core/testing';

import { BabyAddService } from './baby-add.service';

describe('BabyAddService', () => {
  let service: BabyAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabyAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
