import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterVar } from './filter-var';

describe('FilterVar', () => {
  let component: FilterVar;
  let fixture: ComponentFixture<FilterVar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterVar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterVar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
