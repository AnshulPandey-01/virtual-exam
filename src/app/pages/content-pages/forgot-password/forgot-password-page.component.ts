import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/services/auth.service';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    //@ViewChild('f') forogtPasswordForm: NgForm;
 forgotPasswordForm: FormGroup;
 loading = false;
 errors: any = [];
 value=1;
 correct=false;
 otpForm:FormGroup;
 passwordForm:FormGroup;
    constructor(private router: Router,
        private route: ActivatedRoute,private fb:FormBuilder,private authService: AuthService,
        private cdRef:ChangeDetectorRef) { }
     ngOnInit(){
        this.forgotPasswordForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			]
		});

		this.otpForm=this.fb.group({
			otp:['',Validators.compose([
				Validators.required])]
		});
		this.passwordForm=this.fb.group({
		  pwd:['',Validators.compose([
			Validators.required])],
		  pwd1:['',Validators.compose([
			Validators.required])]
		})
     }
    // On submit click, reset form fields
    submit() {
     
        if(this.forgotPasswordForm.invalid){
            return;
        }
        
        const req=this.forgotPasswordForm.value;
        //console.log(req);
        this.authService.forgot_Password(req).subscribe((res:any)=>{
            if(res){
          //  console.log(res);
            this.value=2;
            this.cdRef.detectChanges();
            }
        },
        error =>{
            console.log(error);
        })
       
    }
    submit1(){
        // console.log(this.value);
        if (this.otpForm.invalid) {
            return;
        }
        const req={email:this.forgotPasswordForm.get('email').value,
                code:this.otpForm.get('otp').value}
        this.authService.otp_Verify(req).subscribe((res:any)=>{
            if(res){
               // console.log(res);
                this.value=3;
                this.cdRef.detectChanges();
            }
        })
    }
    submit2(){
        if (this.passwordForm.invalid) {
            return;
        }
        if(!this.correct){
            const req={email:this.forgotPasswordForm.controls.email.value,
                password:this.passwordForm.controls.pwd.value,
                confirm_password:this.passwordForm.controls.pwd1.value}
            this.authService.reset_Password(req).subscribe((res:any)=>{
                if(res){
                 //   console.log(res);
                    //this.forgotPasswordForm.reset();
                    //this.otpForm.reset();
                    //this.passwordForm.reset();
                    //this.value=1;
                   this.router.navigate(['/pages/login']);
                    //this.cdRef.detectChanges();
                }
            },
            error => {
                console.log(error);
            });
        }

    }
    resendOtp(){

    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }
    string(inputvalue:any){
    
        const pattern=new  RegExp("^[0-9]+$");
        if(inputvalue.value[inputvalue.value.length-1].match(pattern))
        {
        
       }
       else if(inputvalue.value){
        var res= inputvalue.value.replace(inputvalue.value, "");
        inputvalue.value=res;
       }
    }
    
    hide(){
        this.correct=false;
   }
   match(){
  
    if(this.passwordForm.controls.pwd.value!=this.passwordForm.controls.pwd1.value){
      this.correct=true;
    }
   }

   isControlHasError( controlName: string, validationType: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];
    if (!control) {
        return false;
    }

    const result =
        control.hasError(validationType) &&
        (control.dirty || control.touched);
    return result;
}

  
}



   
  
  






