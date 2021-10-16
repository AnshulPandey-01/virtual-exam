import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'app/shared/services/student.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';
import { SpeedTestService } from 'ng-speed-test';
declare var $;
@Component({
  selector: 'app-subjective',
  templateUrl: './subjective.component.html',
  styleUrls: ['./subjective.component.scss']
})
export class SubjectiveComponent implements OnInit,OnDestroy {
  subjective=new FormArray([]);
  testStatus=false;
  timestatus=true;
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  mcq: any;
elem;
statusactive;
status = "runing";
constructor(private student: StudentService, private cdr: ChangeDetectorRef, private toastr: ToastrService,
   private router: Router,private fb:FormBuilder,private speedTestService:SpeedTestService) {

}

@HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
  e.preventDefault();
}

@HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
  e.preventDefault();
}

@HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
  e.preventDefault();
}
/*
@HostListener('mousedown', ['$event']) blockdown(e: KeyboardEvent) {
  e.preventDefault();
}
@HostListener('selectstart', ['$event']) blockselect(e: KeyboardEvent) {
  e.preventDefault();
}
*/
ngOnInit(): void {
  this.gettestquestion();
  this.elem = document.documentElement;
  this.getpop();
  this.fullscreen();
  this.offline();
  this.active();
  console.log(this.subjective);
}

active(){
  this.statusactive=setInterval(()=>{
  if(!document.hasFocus()){
    swal.fire({
      title: "Do not switch a Tab",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    })
  }
},1000);

}

offline(){
  window.addEventListener('offline', (event) => {
    swal.fire({
      title: "Your are offline check your network connection",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false,
    })
   });
}
initform(){
  
  for(let i of this.mcq){
     this.subjective.push(this.fb.group({
      question:i.question,
      show:i.show,
      rollNo:i.rollNo,
      answer:i.answer,
      testId:i.testId,
      questionId:i.questionId,
      visit:i.visit,
      marks:i.marks
     }))
  }
  
}

show_network(){
  this.speedTestService.getMbps().subscribe(
    (speed) => {
      if(Math.round(speed)<2){
        swal.fire({
          title: "Your network speed is too slow check your network connection",
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        })      
      }
      else{
        console.log('Your speed is ' +Math.floor(speed));
      }
    }
  );
}

getpop() {
  swal.fire({
    title: "Start Test",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result) {
      this.full();
      this.testStatus=true;
      if(this.timestatus){
        setTimeout(()=>{
          this.show_network();
         },10000);
        this.countdown.config.leftTime=parseInt(sessionStorage.getItem('time'))*60;
        if(parseInt(sessionStorage.getItem('time'))>60){
          this.countdown.config.format='HH:mm:ss';
        }
        else{
          this.countdown.config.format='mm:ss';
        }
        this.countdown.restart();
       }
       setTimeout(()=>{
        this.show_network();
       },((this.countdown.config.leftTime*1000)-5000));
    }
  });
}

full() {
  if (this.elem.requestFullscreen) {
    this.elem.requestFullscreen();
  } else if (this.elem.mozRequestFullScreen) {
    /* Firefox */
    this.elem.mozRequestFullScreen();
  } else if (this.elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    this.elem.webkitRequestFullscreen();
  } else if (this.elem.msRequestFullscreen) {
    /* IE/Edge */
    this.elem.msRequestFullscreen();
  }

}

gettestquestion() {
  this.student.getTest().subscribe((res: any) => {
    if (res) {
      console.log(res);
      res.map((v) => {
        v.show = false;
        v.rollNo = sessionStorage.getItem("roll");
        v.answer = null;
        v.visit=false;
        return v;
      });
      console.log(res);
      this.mcq = res;
      this.mcq[0].show = true;
      this.initform();
    }
  },
    error => {
      console.log(error);
    })
}

prev(j) {
  
  this.subjective.controls[j].get('show').setValue(false);
  this.subjective.controls[j-1].get('show').setValue(true);
 
}
next(j) {
  this.subjective.controls[j].get('show').setValue(false);
  this.subjective.controls[j+1].get('show').setValue(true);
}

setquestion(j) {

  for (let i of this.subjective.controls) {
    i.get('show').setValue(false);
  }
  this.subjective.controls[j].get('show').setValue(true);
}

submit() {
  console.log(this.subjective.value);
  const req = [];
  this.subjective.value.map((x) => {
    req.push({
      answer: x.answer,
      rollNo: x.rollNo,
      testId: x.testId,
      questionId: x.questionId
    });
  });
  console.log(req);

  this.student.sendSubjectiveTestAnswer(req).subscribe((res: any) => {
    if (res) {
      this.status = "finish";
      document.exitFullscreen();
      this.toastr.success('', "Test submitted ", {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
      sessionStorage.removeItem('testId');
      this.router.navigate(['exam-portal/student/test']);
    }
  },
    error => {
      console.log(error);
      this.toastr.show('', 'Test Invalid', {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
    })

}

setAnswer(j) {

  if(this.subjective.controls[j].get('answer').value!=null && this.subjective.controls[j].get('answer').value!=''){
    this.subjective.controls[j].get('visit').setValue(true);
    this.cdr.detectChanges();
  }
}

fullscreen() {
  document.addEventListener('fullscreenchange', (event) => {
    console.log("hi run");
    if (document.fullscreenElement == null && this.status == "runing") {
      this.timestatus=false;
      this.getpop();
    }
  });
}

ngOnDestroy() {
  document.exitFullscreen();
  clearInterval(this.statusactive);
  sessionStorage.removeItem('testId');
  sessionStorage.removeItem('time');
}
handleEvent(event){
  
    console.log(event);
    if(event.action=='done' && this.testStatus){
      swal.fire({
        title: "Test Was Submitted",
        timer:3000,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      }
      );
      this.submit();
     
    }
}
}







