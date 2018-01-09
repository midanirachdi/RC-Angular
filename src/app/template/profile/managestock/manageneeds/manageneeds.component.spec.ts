import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageneedsComponent } from './manageneeds.component';

describe('ManageneedsComponent', () => {
  let component: ManageneedsComponent;
  let fixture: ComponentFixture<ManageneedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageneedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
