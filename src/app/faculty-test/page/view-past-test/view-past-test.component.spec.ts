import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPastTestComponent } from './view-past-test.component';

describe('ViewPastTestComponent', () => {
  let component: ViewPastTestComponent;
  let fixture: ComponentFixture<ViewPastTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPastTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPastTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
