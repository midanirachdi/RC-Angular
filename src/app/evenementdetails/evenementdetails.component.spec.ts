import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementdetailsComponent } from './evenementdetails.component';

describe('EvenementdetailsComponent', () => {
  let component: EvenementdetailsComponent;
  let fixture: ComponentFixture<EvenementdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
