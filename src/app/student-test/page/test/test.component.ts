import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'app/shared/services/student.service';
import swal from 'sweetalert2';
declare var $;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  id = sessionStorage.getItem('roll');
  upcoming_test = [];
  constructor(private student: StudentService, private router: Router, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getStudenttest();
  }

  getStudenttest() {
    this.student.getStudentTest(this.id).subscribe((res: any) => {
      if (res) {
        res.map((x)=>{
          if(x.subjective){
            x.subjective="Theory";
          }
          else{
            x.subjective="MCQ"
          }
        })
        this.upcoming_test = res;
        this.cdr.detectChanges();
      }
    },
      error => {
        console.log(error);
      })
  }

  start(i, j) {
    console.log(i);
    swal.fire({
      title: 'Start Test',
      allowOutsideClick: false,
      html: '<div><form> <div class="row my-2"><div class="col-4 text-left"><div class="form-group"><h6>Test Id</h6></div></div><div class="col-6 "><div class="form-group"><input type="text" class="form-control" disabled value=' + i + ' id="testid"></div></div></div></div></div><div><div class="row my-2"><div class="col-4 text-left"><div class="form-group"><h6>Password</h6></div></div><div class="col-6"><div class="form-group"><input type="password" class="form-control" id="password"></div></div></div></div></div>',
      buttonsStyling: false,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn btn-primary ml-3',
        cancelButton: 'btn btn-danger '
      },
    }).then((result) => {
      if (result.value) {
        var v=$('#testid').val();
        var v1=$('#password').val();
        console.log(v+" "+v1);
        if (v1 != '' && v1 != null && v1 != undefined && v != '' && v != null && v != undefined) {
          this.student.Testauth({ testId: v, password: v1 }).subscribe((res: any) => {
            if (res[0] == true) {
              sessionStorage.setItem('testId', i);
              console.log(j);
              sessionStorage.setItem('time',j);

                  if (res[1] == false) {
                    this.router.navigate(['/mcq']);
                  }
                  else {
                    this.router.navigate(['/subjective']);
                  }
            }
            else {
              swal.fire({
                title: "Invalid Test Id or Password",
                //text: "Something went wrong",
                icon: "error",
                customClass: {
                  confirmButton: 'btn btn-primary'
                },
                buttonsStyling: false,
              });
            }
          },
            error => {
              console.log(error);
            })



        }
        else {
          swal.fire({
            title: "Error!",
            text: "Something went wrong",
            icon: "error",
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          });
        }
      }
    });
  }


  /*function diff_minutes(dt2, dt1) 
  {
 
   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= 60;
   return Math.abs(Math.round(diff));
   
  }
 dt1 = new Date(2014,10,2);
 dt2 = new Date(2014,10,3);
 console.log(diff_minutes(dt1, dt2));
*/
}
