import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacultyService } from '../../../shared/services/faculty.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facultylist',
  templateUrl: './facultylist.component.html',
  styleUrls: ['./facultylist.component.scss']
})
export class FacultylistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['s_no', 'faculty_name', 'faculty_email', 'Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // new MatTableDataSource<any>();
  constructor(private route: Router, private faculty: FacultyService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getFacultyList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  newfaculty() {
    this.route.navigate(['/faculty/new']);
  }
  getFacultyList() {
    this.faculty.getFacultyList().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.dataSource = res;
        this.cdRef.detectChanges();
      }
    },
      error => {
        console.log(error);
      })
  }
  setstatus(a,b){
   //console.log(a);
   //console.log(b);
   const req={email :b.email,allowed:a.checked}
   this.faculty.facultystatuschange(req).subscribe((res:any)=>{
    if(res){
      console.log(res);
    }
   },error =>{
     console.log(error);
   });

  }
  delete(i){
    console.log(i);
     swal.fire({
       title: 'Are you sure to delete Faculty',
       allowOutsideClick: false,
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
     this.faculty.deletefaculty(i).subscribe((res:any)=>{
         if(res){
           this.getFacultyList();
         }
     },
     error =>{
       console.log(error);
     });
  }
})
 }
 
 

}
