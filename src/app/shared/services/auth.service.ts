import { Injectable } from "@angular/core";
import {environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class AuthService{
   
     constructor(private http: HttpClient) {}
     login(data):Observable<any>{
      
         return this.http.post(environment.API_URL+'admin_login',data)
     }
     forgot_Password(data):Observable<any>{
       return this.http.post(environment.API_URL+'/admin/forgotpassword/',data)
     }
     otp_Verify(data):Observable<any>{
       return this.http.post(environment.API_URL+'/admin/verify-link/',data);
     }
     reset_Password(data):Observable<any>{
      return this.http.post(environment.API_URL+'/admin/resetpassword/',data);
     }
     getToken() {
      return localStorage.getItem('authToken');
    }
    changePassword(v,data){
      return this.http.post(environment.API_URL+'change_password/'+v,data);
    }
  }