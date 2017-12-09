import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersItemComponent } from './job-offers-item.component';

describe('JobOffersItemComponent', () => {
  let component: JobOffersItemComponent;
  let fixture: ComponentFixture<JobOffersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOffersItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOffersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
