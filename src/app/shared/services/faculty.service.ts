import { Injectable } from "@angular/core";
import {environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class FacultyService{
 constructor(private http: HttpClient){

 }
   getFacultyList():Observable<any>{
       return this.http.get(environment.API_URL+'faculties');
   }
   addFaculty(data):Observable<any>{
       return this.http.post(environment.API_URL+'add_faculty',data);
   }
   createTestDetails(data){
    return this.http.post(environment.API_URL+'create_test',data);
   }
   login(data){
       return this.http.post(environment.API_URL+'faculty_login',data);
   }
   subjective(data){
    return this.http.post(environment.API_URL+'create_sub_test',data);
   }
   mcq(data){
       return this.http.post(environment.API_URL+'create_mcq_test',data);
   }
   getTest(){
    return this.http.get(environment.API_URL+'tests/'+sessionStorage.getItem('username'));
   }
   deletefaculty(email){
    return this.http.delete(environment.API_URL+'remove/faculty/'+email);
   }
   getFacultyPastTest(){
    return this.http.get(environment.API_URL+'faculty/past_tests/'+sessionStorage.getItem('username'));
   }
   facultystatuschange(data){
    return this.http.post(environment.API_URL+'change_faculty_access',data);
   }
   pastTestResult(data){
    return this.http.get(environment.API_URL+'faculty/past_tests/attendance/'+data);
   }
   getPastTestCheck(id,roll){
       return this.http.get(environment.API_URL+'faculty/past_tests/answer/'+id+'/'+roll);
   }
   setPastTestScore(id,roll, data){
    return this.http.post(environment.API_URL+'faculty/past_tests/check/'+id+'/'+roll, data);
   }
   addFacultyCsv(data){
    return this.http.post(environment.API_URL+'add_faculties',data);
   }
}