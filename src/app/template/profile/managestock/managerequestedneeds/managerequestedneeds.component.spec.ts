import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerequestedneedsComponent } from './managerequestedneeds.component';

describe('ManagerequestedneedsComponent', () => {
  let component: ManagerequestedneedsComponent;
  let fixture: ComponentFixture<ManagerequestedneedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerequestedneedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerequestedneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
