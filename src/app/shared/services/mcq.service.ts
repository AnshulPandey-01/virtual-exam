import { Injectable } from "@angular/core";
import{environment} from '../../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import {  Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class McqService{

   constructor(private http:HttpClient){}
   getTestQuestion():Observable<any>{
       return this.http.get('http://localhost:8080/mcq-questions')
   }
 
}