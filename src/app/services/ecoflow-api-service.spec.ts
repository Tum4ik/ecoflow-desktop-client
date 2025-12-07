import { TestBed } from '@angular/core/testing';

import { EcoflowApiService } from './ecoflow-api-service';

describe('EcoflowApiService', () => {
  let service: EcoflowApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcoflowApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
