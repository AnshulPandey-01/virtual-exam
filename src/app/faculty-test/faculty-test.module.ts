import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from 'app/faculty-test/page/test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NewTestComponent } from './page/new-test/new-test.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PastTestComponent } from './page/past-test/past-test.component';
import {PastTestResultComponent} from './page/past-test-result/past-test-result.component';
import { PastTestResultViewComponent } from './page/past-test-result-view/past-test-result-view.component';
import { FacultySearchComponent } from './page/faculty-search/faculty-search.component';
import { FacultySearchResultComponent } from './page/faculty-search-result/faculty-search-result.component';
import {ViewPastTestComponent} from './page/view-past-test/view-past-test.component';
import { from } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
const route:Routes=[
  {
    path:'test',
    component:TestComponent,
  },
  {
    path:'test/new',
    component:NewTestComponent
  },
  {
    path:'past-test',
    component:PastTestComponent
  },
  {
    path:'past-test/:id',
    component:PastTestResultComponent
  },
  {
    path:'past-test/:id/:roll',
    component:PastTestResultViewComponent
  },
  {
    path:'past-test-view/:id/:roll',
    component:ViewPastTestComponent
  },
  {
    path: 'search',
    component: FacultySearchComponent,
   },
   {
    path: 'search/:id',
    component: FacultySearchResultComponent,
   },
]

@NgModule({
  declarations: [TestComponent, NewTestComponent, ViewPastTestComponent, PastTestComponent,PastTestResultComponent, PastTestResultViewComponent,FacultySearchComponent, FacultySearchResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatIconModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgSelectModule,
    NgbTimepickerModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FacultyTestModule { }
