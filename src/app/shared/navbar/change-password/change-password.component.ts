import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 form:FormGroup;
 correct=false;
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,private fb:FormBuilder,
    private authService: AuthService,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.initform();
  }
initform(){
  this.form = this.fb.group({
    email: [sessionStorage.getItem('email')],
    password: ['', Validators.compose([
      Validators.required,
    ])
    ],
    newPassword: ['', Validators.compose([
      Validators.required,
    ])
    ],
    c_password:['',Validators.required]
  });
}

submit(){
  console.log(this.form.value);
  this.correct=false;
  if (this.form.invalid) {
    return;
  }
  if(this.form.controls.newPassword.value!=this.form.controls.c_password.value){
    this.correct=true;
    return ;
  }

  var req=this.form.value;
  delete req.c_password;
  console.log(req);
  var type=sessionStorage.getItem('type');
  this.authService.changePassword(type,req).subscribe((res:any)=>{
    if(res){
      console.log(res);
      this.toastr.success('', res[0], {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
      this.dialogRef.close();
    }
  },error =>{
    this.toastr.show('',error.error[0], {
      positionClass: 'toast-bottom-center', closeButton: true , "easeTime": 500
    });
    console.log(error);
  })

}

}
