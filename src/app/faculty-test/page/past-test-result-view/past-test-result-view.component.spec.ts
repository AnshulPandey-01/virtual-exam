import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTestResultViewComponent } from './past-test-result-view.component';

describe('PastTestResultViewComponent', () => {
  let component: PastTestResultViewComponent;
  let fixture: ComponentFixture<PastTestResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTestResultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTestResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
