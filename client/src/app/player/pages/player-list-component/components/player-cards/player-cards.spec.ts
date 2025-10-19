import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCards } from './player-cards';

describe('PlayerCards', () => {
  let component: PlayerCards;
  let fixture: ComponentFixture<PlayerCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
