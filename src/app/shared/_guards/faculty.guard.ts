// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
}
)
export class FacultyGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /* if (!this.auth.getToken()) {
           this.router.navigateByUrl('/pages/login');
         }
         */
        if (sessionStorage.getItem('username') && sessionStorage.getItem('type') == "FACULTY") {
            console.log("set username and type");
        }
        else {
            this.router.navigateByUrl('/exam-portal');
            sessionStorage.clear();
        }
        return true;
        /*return this.store
          .pipe(
            select(isLoggedIn),
            tap(loggedIn => {
              console.log('loggedIn', loggedIn);
    
            })
          );*/
    }
}
