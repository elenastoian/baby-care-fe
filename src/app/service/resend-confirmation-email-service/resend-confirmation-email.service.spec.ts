import { TestBed } from '@angular/core/testing';

import { ResendConfirmationEmailService } from './resend-confirmation-email.service';

describe('ResendConfirmationEmailService', () => {
  let service: ResendConfirmationEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResendConfirmationEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
