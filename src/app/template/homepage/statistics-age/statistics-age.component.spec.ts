import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAgeComponent } from './statistics-age.component';

describe('StatisticsAgeComponent', () => {
  let component: StatisticsAgeComponent;
  let fixture: ComponentFixture<StatisticsAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
