import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyService } from 'app/shared/services/faculty.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-past-test-result-view',
  templateUrl: './past-test-result-view.component.html',
  styleUrls: ['./past-test-result-view.component.scss']
})
export class PastTestResultViewComponent implements OnInit {
  testid;
  roll;
  test_type = "Theory";
  question: any;
  constructor(private activeRoute: ActivatedRoute, private location: Location,
    private faculty: FacultyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.testid = this.activeRoute.snapshot.params['id'];
    this.roll = this.activeRoute.snapshot.params['roll'];
    if (this.testid != null && this.testid != undefined && this.testid != '' && this.roll != null && this.roll != undefined && this.roll != '') {
      console.log(this.testid);
      console.log(this.roll);
      this.getpastTestview();
    }
  }
  digit(v) {
    var pattern = /[0-9]/;
    if (v.data != null && v.data.match(pattern)) {
    }
    else {
      v.target.value = '';
    }
  }
  goback() {
    this.location.back();
  }

  getpastTestview() {
    this.faculty.getPastTestCheck(this.testid, this.roll).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.question = res;
        if (this.question.subjective) {
          this.test_type = 'Theory';
          res.ansList.map((x) => {
            if (x.score == -1) {
              x.score = "";
            }
          })
        }
        else {
          this.test_type = "MCQ";
        }
      }
    }, error => {
      console.log(error);
    })
  }
  save() {
    var req = []
    console.log(this.question.ansList);
    this.question.ansList.map((x) => {
      if (x.score == "") {
        this.toastr.show('', 'Give mark for all Question.', {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        return;
      }
      if (x.score > x.marks) {
        this.toastr.show('', 'Score are greater than assign marks of the question.', {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        return;
      }
      req.push({ questionId: x.questionId, score: x.score });
    });
    console.log(req);
    this.faculty.setPastTestScore(this.testid, this.roll, req).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.toastr.success('', res[0], {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        this.goback();
      }
    }, error => {
      console.log(error);
    });

  }
}
