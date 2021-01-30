import { TestBed } from '@angular/core/testing';

import { FirebaseEmailAuthService } from './firebase-email-auth.service';

describe('FirebaseEmailAuthService', () => {
  let service: FirebaseEmailAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseEmailAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
