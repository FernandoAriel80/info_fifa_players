import { TestBed } from '@angular/core/testing';

import { NationalityApiImplService } from './nationality-api-impl-service';

describe('NationalityApiImplService', () => {
  let service: NationalityApiImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalityApiImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
