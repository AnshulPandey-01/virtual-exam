import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacultyService } from 'app/shared/services/faculty.service';

@Component({
  selector: 'app-past-test',
  templateUrl: './past-test.component.html',
  styleUrls: ['./past-test.component.scss']
})
export class PastTestComponent implements OnInit {
  displayedColumns: string[] = ['s_no','title','testId','subjectCode','type','resultOn','Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route:Router,private faculty:FacultyService,private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
     this.getFacultyPastTest();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getFacultyPastTest(){
    this.faculty.getFacultyPastTest().subscribe((res:any)=>{
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
  pastTest(v){
    this.route.navigate(['exam-portal/faculty/past-test',v.testId]);
  }

}





