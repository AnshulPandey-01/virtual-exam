import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyaddComponent } from './facultyadd.component';

describe('FacultyaddComponent', () => {
  let component: FacultyaddComponent;
  let fixture: ComponentFixture<FacultyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
