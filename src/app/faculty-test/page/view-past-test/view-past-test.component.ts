import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'app/shared/services/student.service';
declare var $;
@Component({
  selector: 'app-view-past-test',
  templateUrl: './view-past-test.component.html',
  styleUrls: ['./view-past-test.component.scss']
})
export class ViewPastTestComponent implements OnInit,OnDestroy {
  show=sessionStorage.getItem('type');
  //show="MCQ";
  testid;
  roll;
  //question:any;
question:any;
  
  constructor(private location:Location,private activeRoute:ActivatedRoute,private student:StudentService) { }

  ngOnInit(): void {
    this.testid=this.activeRoute.snapshot.params['id'];
    this.roll = this.activeRoute.snapshot.params['roll'];
    if(this.testid!=null && this.testid!=undefined && this.testid!=''){
      this.getPastTest(this.testid,this.roll);
    }
  }
  
  ngOnDestroy(){
    sessionStorage.removeItem('type');
  }
  goback(){
    this.location.back();
  }
  getPastTest(v,v1){
    this.student.getPastTestViewbyroll(v,v1).subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.question=res;
      }
    },
    error =>{
      console.log(error);
    });
  }
   check(i,j,k){
     if(this.question[i].correctOption==j){

     }
     else{
       $('#'+k+i).prop('checked', false);
     }
   }
}
