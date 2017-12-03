import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersectionComponent } from './volunteersection.component';

describe('VolunteersectionComponent', () => {
  let component: VolunteersectionComponent;
  let fixture: ComponentFixture<VolunteersectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteersectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
