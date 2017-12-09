import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersDetailComponent } from './job-offers-detail.component';

describe('JobOffersDetailComponent', () => {
  let component: JobOffersDetailComponent;
  let fixture: ComponentFixture<JobOffersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOffersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOffersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
