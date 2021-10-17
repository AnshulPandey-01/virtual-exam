import { RouteInfo } from './vertical-menu.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: 'faculty', title: 'Faculty', icon: 'ft-home', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    ]
  },
  {
    path: 'student', title: 'Student', icon: 'ft-home', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    ]
  },
];

export const ROUTE1: RouteInfo[] = [
    {
      path: 'exam-portal/student/test', title: 'Test', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
      ]
    },
    {
      
      path: 'exam-portal/student/past-test', title: 'Past Test', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: []
    },
    {
      path: 'exam-portal/student/stats', title: 'Stats', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: []
    }
];

export const ROUTE2: RouteInfo[] = [
  {
    path: 'exam-portal/faculty/test', title: 'Test', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    ]
  },
  {
    path: 'exam-portal/faculty/past-test', title: 'Past Test', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    ]
  },
  {
    path: 'exam-portal/faculty/search', title: 'Search Student', icon: 'ft-home', class: '', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
    ]
  },
];
