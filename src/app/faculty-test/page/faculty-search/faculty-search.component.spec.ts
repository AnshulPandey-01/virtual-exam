import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySearchComponent } from './faculty-search.component';

describe('FacultySearchComponent', () => {
  let component: FacultySearchComponent;
  let fixture: ComponentFixture<FacultySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
