import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacultySearchComponent } from '../faculty-test/page/faculty-search/faculty-search.component';
import { FacultyaddComponent } from './page/facultyadd/facultyadd.component';
import { FacultylistComponent } from './page/facultylist/facultylist.component';

const routes: Routes = [
  {path:'',
  children:[
    {
        path:'',
        redirectTo:'list',
        pathMatch:'full'
    },
   {
     path: 'list',
     component: FacultylistComponent,
     data: {
       title: 'list'
     }
   },
   {
     path: 'new',
     component: FacultyaddComponent,
     data: {
       title: 'new'
     }
   },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
