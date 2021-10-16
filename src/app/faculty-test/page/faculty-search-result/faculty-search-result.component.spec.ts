import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySearchResultComponent } from './faculty-search-result.component';

describe('FacultySearchResultComponent', () => {
  let component: FacultySearchResultComponent;
  let fixture: ComponentFixture<FacultySearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultySearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
