import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {StudentService} from '../../../shared/services/student.service';
declare var $;
@Component({
  selector: 'app-past-test',
  templateUrl: './past-test.component.html',
  styleUrls: ['./past-test.component.scss']
})
export class PastTestComponent implements OnInit {
  displayedColumns: string[] = ['s_no','testId','title','subjectCode','type','resultOn','Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private route:Router,private student:StudentService,private cdRef:ChangeDetectorRef,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStudentPastTest();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  getStudentPastTest(){
    this.student.getStudentPastTest().subscribe((res:any)=>{
      console.log(res);
     if(res){
      res.map((x)=>{
        var r=x.resultOn.split(" ");
        x.date=r[0];
        x.time=r[1];
        if(x.subjective){
          x.subjective="Theory";
        }
        else{
          x.subjective="MCQ"
        }
      })
       this.dataSource=res;
       this.cdRef.detectChanges();
     }
    },
    error =>{
      console.log(error);
    })
  }
  pastTest(v,i){
    if(!v.present){
    $('#view'+i).html('');
    $('#view'+i).html('<span class="text-danger font-weight-bold">Absent</span>');
    }
    else{
      this.student.checkPastReasult(v.testId).subscribe((res:any)=>{
        if(res[0]==true){
          sessionStorage.setItem('type',v.subjective);
          this.route.navigate(['exam-portal/student/past-test',v.testId]);
        }
        else{
          this.toastr.show('','Reasult is Not Decleared', {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
        }
      },error =>{
        console.log(error);
      });
    }
  }

}




