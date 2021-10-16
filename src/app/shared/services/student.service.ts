import { Injectable } from "@angular/core";
import {environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class StudentService{
 constructor(private http: HttpClient){

 }

 getStudentList():Observable<any>{
    return this.http.get(environment.API_URL+'students');
}
addStudent(data):Observable<any>{
    return this.http.post(environment.API_URL+'add_student',data);
}
getStudentTest(id){
    return this.http.get(environment.API_URL+'student_tests/'+id);
}
StudentLogin(data){
    return this.http.post(environment.API_URL+'student_login',data);
}
Testauth(data){
    return this.http.post(environment.API_URL+'student/authenticate_test',data);
}
getTest(){
    return this.http.get(environment.API_URL+'Test/'+sessionStorage.getItem('testId'));
}
sendTestAnswer(data){
    return this.http.post(environment.API_URL+'test/mcq_answer',data);
}
sendSubjectiveTestAnswer(data){
    return this.http.post(environment.API_URL+'test/sub_answer',data);
}
getStudentPastTest(){
    return this.http.get(environment.API_URL+'student_tests/past/'+sessionStorage.getItem('roll'));
}
deletestudent(email){
    return this.http.delete(environment.API_URL+'remove/student/'+email);
   }
getPastTestView(v){
    return this.http.get(environment.API_URL+'test/'+sessionStorage.getItem('roll')+'/'+v);
   }
addStudentCsv(data){
    return this.http.post(environment.API_URL+'add_students',data);
   }
getStudentbysearch(v){
    return this.http.get(environment.API_URL+'student_tests/past/'+v);
   }
   getPastTestViewbyroll(id,roll){
    return this.http.get(environment.API_URL+'test/'+roll+'/'+id);
   }
checkPastReasult(id){
    return this.http.get(environment.API_URL+'test/result_available/'+id);
}


}