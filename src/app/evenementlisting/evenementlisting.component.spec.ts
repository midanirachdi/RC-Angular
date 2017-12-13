import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementlistingComponent } from './evenementlisting.component';

describe('EvenementlistingComponent', () => {
  let component: EvenementlistingComponent;
  let fixture: ComponentFixture<EvenementlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
