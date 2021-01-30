import { TestBed } from '@angular/core/testing';

import { UploadFirebaseService } from './upload-firebase.service';

describe('UploadFirebaseService', () => {
  let service: UploadFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
