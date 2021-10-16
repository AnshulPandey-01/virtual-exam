import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTestResultComponent } from './past-test-result.component';

describe('PastTestResultComponent', () => {
  let component: PastTestResultComponent;
  let fixture: ComponentFixture<PastTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
