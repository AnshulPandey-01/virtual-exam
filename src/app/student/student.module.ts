import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentlistComponent } from './page/studentlist/studentlist.component';
import { StudentaddComponent } from './page/studentadd/studentadd.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [StudentlistComponent, StudentaddComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class StudentModule { }
