import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefugeesComponent } from './refugees.component';

describe('RefugeesComponent', () => {
  let component: RefugeesComponent;
  let fixture: ComponentFixture<RefugeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefugeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefugeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
