import { Routes, RouterModule } from '@angular/router';
//Route for content layout with sidebar, navbar and footer.
import { AuthGuard } from '../_guards/auth.guard';
import { FacultyGuard } from '../_guards/faculty.guard';
import { StudentGuard } from '../_guards/student.guard';
export const Full_ROUTES: Routes = [
  {
    path: 'faculty',
    loadChildren: () => import('../../faculty/faculty.module').then(m=>m.FacultyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'student',
    loadChildren: () => import('../../student/student.module').then(m=>m.StudentModule),
    canActivate: [AuthGuard]
  },
  {
   path:'exam-portal/student',
   loadChildren:()=>import('../../student-test/student-test.module').then(m=>m.StudentTestModule),
   canActivate: [StudentGuard]
  },
  {
    path:'exam-portal/faculty',
    loadChildren:()=>import('../../faculty-test/faculty-test.module').then(m=>m.FacultyTestModule),
    canActivate: [FacultyGuard]
  },
/*
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  */
];
