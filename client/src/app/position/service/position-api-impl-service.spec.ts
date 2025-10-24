import { TestBed } from '@angular/core/testing';

import { PositionApiImplService } from './position-api-impl-service';

describe('PositionApiImplService', () => {
  let service: PositionApiImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionApiImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
