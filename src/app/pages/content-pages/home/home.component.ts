import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';
import { FacultyService } from 'app/shared/services/faculty.service';
import { StudentService } from 'app/shared/services/student.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginFormSubmitted = false;
  isLoginFailed = false;
  loginForm: FormGroup;
  user = 'Faculty';
  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private fb: FormBuilder, public toastr: ToastrService,
    private faculty: FacultyService, private student: StudentService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.email
        // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])
      ]
    });
  }

  onSubmit1(v) {
    this.user = v
    /* if(this.user=='Student'){
       sessionStorage.setItem('type','Student');
       sessionStorage.setItem('username', 'raj');
       this.router.navigate(["/exam-portal/student/test"]);
     }
     else{
      sessionStorage.setItem('type','Faculty');
      sessionStorage.setItem('username', 'anshul');
      this.router.navigate(["exam-portal/faculty/test"]);
     }
     */
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.spinner.show(undefined,
        {
          type: 'ball-triangle-path',
          size: 'medium',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: true
        });

      if (this.user == 'Student') {
        this.student.StudentLogin(this.loginForm.value).subscribe((res: any) => {
          this.spinner.hide();
          console.log(res[0]);
          sessionStorage.setItem('username', res[1]);
          sessionStorage.setItem('type', res[0]);
          sessionStorage.setItem('email', res[2]);
          sessionStorage.setItem('roll', res[3]);
          this.toastr.success('', "Student login successfully ", {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
          this.router.navigate(["/exam-portal/student/test"]);

        }, error => {
          this.spinner.hide();
          this.toastr.show('', error.error[1], {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
          console.log(error);
        });

      }
      else {
        this.faculty.login(this.loginForm.value).subscribe((res: any) => {
          this.spinner.hide();
          console.log(res[0]);
          sessionStorage.setItem('username', res[1]);
          sessionStorage.setItem('type', res[0]);
          sessionStorage.setItem('email', res[2]);
          this.toastr.success('', "Faculty login successfully ", {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
          this.router.navigate(["exam-portal/faculty/test"]);
        }, error => {
          this.spinner.hide();
          this.toastr.show('', error.error[1], {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
          console.log(error);
        });
      }
    }

  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


}






