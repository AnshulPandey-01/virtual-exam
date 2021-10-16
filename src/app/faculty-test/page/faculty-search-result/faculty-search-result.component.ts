import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/shared/services/student.service';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'app-faculty-search-result',
  templateUrl: './faculty-search-result.component.html',
  styleUrls: ['./faculty-search-result.component.scss']
})
export class FacultySearchResultComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'testId', 'title', 'subjectCode', 'type', 'resultOn', 'Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id;
  status: any;
  error;

  constructor(private route:Router,private student:StudentService,private cdRef:ChangeDetectorRef,
    private activeRoute:ActivatedRoute,private location:Location,public toastr: ToastrService) { }

  
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    if (this.id != null && this.id != undefined && this.id != '') {
      this.getStudentbysearch(this.id);
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  goback() {
    this.location.back();
  }
  getStudentbysearch(v) {
    this.student.getStudentbysearch(v).subscribe((res: any) => {
      console.log(res);
      this.status = "show";
      if (res.length > 0) {
        res.map((x) => {
          var r = x.resultOn.split(" ");
          x.date = r[0];
          x.time = r[1];
          if (x.isSubjective) {
            x.isSubjective = "Theory";
          }
          else {
            x.isSubjective = "MCQ"
          }
        })
        this.dataSource = res;
        this.cdRef.detectChanges();
      }
      else {
        this.dataSource = res;
        this.cdRef.detectChanges();
      }

    },
      error => {
        this.error = error.error.searchResult;
        this.status = "error";
        this.cdRef.detectChanges();
        console.log(error);
      })
  }

  pastTest(v, i) {
    if (!v.isPresent) {
      $('#view' + i).html('');
      $('#view' + i).html('<span class="text-danger font-weight-bold">Absent</span>');
    }
    else{
      this.student.checkPastReasult(v.testId).subscribe((res:any)=>{
        if(res[0]==true){
          sessionStorage.setItem('type',v.isSubjective);
          this.route.navigate(['exam-portal/faculty/past-test-view',v.testId,this.id])
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
