import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacultyService } from 'app/shared/services/faculty.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['s_no','test_id','title','password','is_subjective','schedule_on','result_on','duration','negative_marking','Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route:Router,private cdRef:ChangeDetectorRef,private faculty:FacultyService) { }

  ngOnInit(): void {
    this.getTest();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  newTest(){
 this.route.navigate(["/exam-portal/faculty/test/new"]);
  }

  getTest() {
    this.faculty.getTest().subscribe((res: any) => {
      if (res) {
        console.log(res);
        res.map((x)=>{
        if(x.subjective==false){
          x.subjective='MCQ';
        }
        else{
          x.subjective='Theory';
        }
        })
        this.dataSource = res;
        this.cdRef.detectChanges();
      }
    },
      error => {
        console.log(error);
      })
  }


}
