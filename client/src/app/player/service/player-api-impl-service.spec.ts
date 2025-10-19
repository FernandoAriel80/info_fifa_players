import { TestBed } from '@angular/core/testing';
import { PlayerApiImplService } from './player-api-impl-service';

describe('PlayerApiImplService', () => {
  let service: PlayerApiImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PlayerApiImplService]
    });
    service = TestBed.inject(PlayerApiImplService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});