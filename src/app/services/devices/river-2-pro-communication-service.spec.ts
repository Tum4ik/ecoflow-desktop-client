import { TestBed } from '@angular/core/testing';

import { River2ProCommunicationService } from './river-2-pro-communication-service';

describe('River2ProCommunicationService', () => {
  let service: River2ProCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(River2ProCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
