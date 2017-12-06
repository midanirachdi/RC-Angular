import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepostfullComponent } from './singlepostfull.component';

describe('SinglepostfullComponent', () => {
  let component: SinglepostfullComponent;
  let fixture: ComponentFixture<SinglepostfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepostfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepostfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
