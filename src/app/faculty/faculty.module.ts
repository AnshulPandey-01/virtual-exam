import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultylistComponent } from './page/facultylist/facultylist.component';
import { FacultyaddComponent } from './page/facultyadd/facultyadd.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [FacultylistComponent, FacultyaddComponent],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ]
})
export class FacultyModule { }
