import { TestBed } from '@angular/core/testing';

import { ClubApiImplService } from './club-api-impl-service';

describe('ClubApiImplService', () => {
  let service: ClubApiImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubApiImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
