import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {StudentService} from '../../../shared/services/student.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {
  displayedColumns: string[] = ['s_no','student_roll','student_name','student_email','branch','semester','section','Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route:Router,private student:StudentService,private cdRef:ChangeDetectorRef,public toastr: ToastrService) { }

  ngOnInit(): void {
   this.getStudentList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  newstudent(){
    this.route.navigate(['/student/new']);
  }
  getStudentList(){
    this.student.getStudentList().subscribe((res:any)=>{
      console.log(res);
     if(res){
       this.dataSource=res;
       this.cdRef.detectChanges();
     }
    },
    error =>{
      console.log(error);
    })
  }
  delete(i){
     console.log(i);
      swal.fire({
        title: 'Student data will be permanently deleted',
        allowOutsideClick: false,
        buttonsStyling: false,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        reverseButtons: true,
        showLoaderOnConfirm: true,
        customClass: {
          confirmButton: 'btn btn-danger ml-3',
          cancelButton: 'btn btn-primary'
        },
      }).then((result) => {
        if (result.value) {
      this.student.deletestudent(i).subscribe((res:any)=>{
          if(res){
            this.getStudentList();
            this.toastr.success('','Deleted Successfully', {
              positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
            });
          }
      },
      error =>{
        console.log(error);
      });
   }
})
  }
}