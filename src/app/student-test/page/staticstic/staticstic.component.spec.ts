import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsticComponent } from './staticstic.component';

describe('StaticsticComponent', () => {
  let component: StaticsticComponent;
  let fixture: ComponentFixture<StaticsticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticsticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticsticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
