import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementadminComponent } from './evenementadmin.component';

describe('EvenementadminComponent', () => {
  let component: EvenementadminComponent;
  let fixture: ComponentFixture<EvenementadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
