import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentaddComponent } from './page/studentadd/studentadd.component';
import { StudentlistComponent } from './page/studentlist/studentlist.component';

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
     component: StudentlistComponent,
     data: {
       title: 'list'
     }
   },
   {
     path: 'new',
     component: StudentaddComponent,
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
export class StudentRoutingModule { }
