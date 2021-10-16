import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyService } from 'app/shared/services/faculty.service';

@Component({
  selector: 'app-past-test-result',
  templateUrl: './past-test-result.component.html',
  styleUrls: ['./past-test-result.component.scss']
})
export class PastTestResultComponent implements OnInit {
 displayedColumns: string[] = ['s_no','name','rollNo'];
 displayedColumns1: string[] = ['s_no','name','rollNo','score','Action'];
  dataSource = new MatTableDataSource<any>([
    {
      name:'Rajendra Chourasiya',
      rollNo:'08181CS181101',
      score:'-1'
  },
  {
    name:'Anshul Pandey',
      rollNo:'08181CS181029',
      score:'-1'
}
  ]);
  dataSource1 = new MatTableDataSource<any>([
    {
      name:'Rajendra Chourasiya',
      rollNo:'08181CS181101',
      score:'30'
  },
  {
    name:'Anshul Pandey',
      rollNo:'08181CS181029',
      score:'-1'
}
  ]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(private location:Location,private activeRoute:ActivatedRoute,
  private faculty:FacultyService,private route:Router) { }
testid;

  ngOnInit(): void {
    this.testid=this.activeRoute.snapshot.params['id'];
    if(this.testid!=null && this.testid!=undefined && this.testid!=''){
      this.getPastTestresult(this.testid);
    }
    
  }
  getPastTestresult(v){
    this.faculty.pastTestResult(v).subscribe((res:any)=>{
      if(res){
        var present=[];
        var absent=[];
        res.map((x)=>{   
          if(x.isPresent){
            present.push(x);
          }
          else{
            absent.push(x);
          }
        });
        this.dataSource=new MatTableDataSource(absent);
        this.dataSource1=new MatTableDataSource(present);
      }
    },
    error =>{
      console.log(error);
    })
  }
  goback(){
    this.location.back();
  }

  view(v){
      this.route.navigate(['exam-portal/faculty/past-test/',this.testid,v]);  
  }
}
