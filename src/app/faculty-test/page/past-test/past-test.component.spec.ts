import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTestComponent } from './past-test.component';

describe('PastTestComponent', () => {
  let component: PastTestComponent;
  let fixture: ComponentFixture<PastTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
