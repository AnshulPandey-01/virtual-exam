import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-search',
  templateUrl: './faculty-search.component.html',
  styleUrls: ['./faculty-search.component.scss']
})
export class FacultySearchComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
 submit(v){
   console.log(v.value);
   if(v.value==''||v.value==null || v.value==undefined){
     return ;
   }
    this.route.navigate(['exam-portal/faculty/search',v.value]);
 }
}
