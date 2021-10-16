import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
//import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements AfterViewInit {
  loginFormSubmitted = false;
  isLoginFailed = false;
  loginForm: FormGroup;
  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private fb: FormBuilder, public toastr: ToastrService) {
  }
  ngAfterViewInit(): void {
    
    setInterval(()=>{
    },1000);
    
  }

  ngOnInit() {
  
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
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
  onSubmit1() {

    console.log(this.loginForm);
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      // console.log(this.loginForm.value);
      this.spinner.show(undefined,
        {
          type: 'ball-triangle-path',
          size: 'medium',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: true
        });

      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res[1] == 'false') {
          this.toastr.show('', 'Invalid email address and password', {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
        } else{
          sessionStorage.setItem('username', res[1]);
          sessionStorage.setItem('type', res[0]);
          sessionStorage.setItem('email', res[2]);
          this.toastr.success('', 'Admin login successfully', {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
          this.router.navigate(['/faculty']);
        }

        //localStorage.setItem('authToken', res.data.access);
        //localStorage.setItem('pemission',res.data.permissions);
        // console.log(localStorage.getItem('authToken'));
      }, error => {
        this.toastr.show('',error.error[2], {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        console.log(error);
        this.isLoginFailed = true;
        this.spinner.hide();
      }
      )

    }
  }

  // On submit button click
  onSubmit() {

    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    /* this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
       .then((res) => {
         this.spinner.hide();
         this.router.navigate(['/dashboard/dashboard1']);
       })
       .catch((err) => {
         this.isLoginFailed = true;
         this.spinner.hide();
         console.log('error: ' + err)
       }
       );
       */
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
