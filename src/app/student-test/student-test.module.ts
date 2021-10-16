import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './page/test/test.component';
import { RouterModule, Routes } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PastTestComponent } from './page/past-test/past-test.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ViewPastTestComponent } from './page/view-past-test/view-past-test.component';
const route:Routes=[
  {
    path:'test',
    component:TestComponent
  },
  {
    path:'past-test',
    component:PastTestComponent
  },
  {
    path:'past-test/:id',
    component:ViewPastTestComponent
  }
]

@NgModule({
  declarations: [TestComponent, PastTestComponent, ViewPastTestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class StudentTestModule { }
