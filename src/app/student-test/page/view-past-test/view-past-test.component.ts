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
  //question:any;
question:any;/*={
  "title": "test501",
  "facultyName": "VR Raghuveer",
  "subjectCode": "CS-602",
  "scheduledOn": "2021-05-31 03:00:00",
  "duration": 90,
  "totalQuestions": 2,
  "maxMarks": 10,
  "negativeMarks": -1,
  "totalMarks": 0,
  "ansData": [
    {
      "questionId": "1010-1",
      "answer": "3",
      "correctOption": "1",
      "question": "String in Java is a?",
      "option1": "class",
      "option2": "object",
      "option3": "variable",
      "option4": "character array"
  },
  {
      "questionId": "1010-2",
      "answer": "2",
      "correctOption": "2",
      "question": "In python order to store values in terms of key and value we use what core data type.",
      "option1": "dictionary",
      "option2": "tuple",
      "option3": null,
      "option4": null
  },
  {
      "questionId": "1010-3",
      "answer": "4",
      "correctOption": "2",
      "question": "Which of these keywords is used to refer to member of base class from a subclass in java?",
      "option1": "upper",
      "option2": "super",
      "option3": "this",
      "option4": "yes"
  }
  ]
}*/
  constructor(private location:Location,private activeRoute:ActivatedRoute,private student:StudentService) { }

  ngOnInit(): void {
    this.testid=this.activeRoute.snapshot.params['id'];
    if(this.testid!=null && this.testid!=undefined && this.testid!=''){
      this.getPastTest(this.testid);
    }
  }
  
  ngOnDestroy(){
    sessionStorage.removeItem('type');
  }
  goback(){
    this.location.back();
  }
  getPastTest(v){
    this.student.getPastTestView(v).subscribe((res:any)=>{
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
