import { TestBed } from '@angular/core/testing';

import { LeagueApiImplService } from './league-api-impl-service';

describe('LeagueApiImplService', () => {
  let service: LeagueApiImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeagueApiImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
