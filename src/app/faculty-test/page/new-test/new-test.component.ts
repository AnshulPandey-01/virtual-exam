import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { FacultyService } from 'app/shared/services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})
export class NewTestComponent implements OnInit {
  isLinear = true;
  testform1: FormGroup;
  questionForm: FormGroup;
  subjective = [{ name: 'MCQ', value: 'false' }, { name: 'Theory', value: 'true' }];
  duration = [{ name: '30 Minute', value: '30' }, { name: '1:00 hours', value: '60' }, { name: '1:30 hours', value: '90' }, { name: '2:00 hours', value: '120' }, { name: '2:30 hours', value: '150' },
  { name: '3:00 hours', value: '180' }, { name: '3:30 hours', value: '210' }];
  branch = [{ name: 'Information Technology', value: 'IT' }, { name: 'Mechanical Engineering', value: 'ME' }, { name: 'Computer Science', value: 'CSE' }];
  sem = [{ name: 'First Semester', value: '1' }, { name: 'Second Semester', value: '2' }, { name: 'Third Semester', value: '3' }, { name: 'Fourth Semester', value: '4' }, { name: 'Fifth Semester', value: '5' },
  { name: 'Sixth Semester', value: '6' }, { name: 'Seventh Semester', value: '7' }, { name: 'Eighth Semester', value: '8' }]
  minDate = new Date();
  time = { hour: 0, minute: 0 };
  time1 = { hour: 0, minute: 0 }
  showtime = false;
  showtime1 = false;
  tvalidation = false;
  total_mark = 0;
  total_question = 0;
  @ViewChild('stepper') private myStepper: MatStepper;
  loader3 = false;
  loader4=false;
  csvobject: any = [];
  buttontype = true;
  constructor(private _formBuilder: FormBuilder, private datePipe: DatePipe, private faculty: FacultyService,
    private location: Location, private toastr: ToastrService, private cdRef: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.testform1 = this._formBuilder.group({
      title: ['', Validators.required],
      password: ['', Validators.required],
      subjective: ['', Validators.required],
      scheduleOn: ['', Validators.required],
      resultOn: ['', Validators.required],
      duration: ['', Validators.required],
      subjectCode: ['', Validators.required],
      branch: ['', Validators.required],
      sem: ['', Validators.required],
      section: ['', Validators.required],
      negativeMarks: [''],
      marks: [''],
      time1: ['', Validators.required],
      time2: ['', Validators.required]
    });

    this.questionForm = this._formBuilder.group({
      question: this._formBuilder.array([])
    });
  }

  goback() {
    this.location.back();
  }

  timer1(value: any) {
    if (this.time1.minute < 10 && this.time1.hour < 10) {
      this.testform1.get('time2').setValue('0' + this.time1.hour + ':' + '0' + this.time1.minute)
    }
    else if (this.time1.hour < 10) {
      this.testform1.get('time2').setValue('0' + this.time1.hour + ':' + this.time1.minute)
    }
    else if (this.time1.minute < 10) {
      this.testform1.get('time2').setValue(this.time1.hour + ':' + '0' + this.time1.minute)
    }
    else {
      this.testform1.get('time2').setValue(this.time1.hour + ':' + this.time1.minute)
    }

  }

  timer(value: any) {
    if (this.time.minute < 10 && this.time.hour < 10) {
      this.testform1.get('time1').setValue('0' + this.time.hour + ':' + '0' + this.time.minute)
    }
    else if (this.time.hour < 10) {
      this.testform1.get('time1').setValue('0' + this.time.hour + ':' + this.time.minute)
    }
    else if (this.time.minute < 10) {
      this.testform1.get('time1').setValue(this.time.hour + ':' + '0' + this.time.minute)
    }
    else {
      this.testform1.get('time1').setValue(this.time.hour + ':' + this.time.minute)
    }

  }

  setTime() {
    this.showtime1 = false;
    this.showtime = true;
  }

  setTime1() {
    this.showtime = false;
    this.showtime1 = true;
  }

  remove() {
    this.testform1.get('time2').setValue(null);
  }

  remove1() {
    this.testform1.get('time1').setValue(null);
  }

  hide() {
    this.showtime = false;
  }
  hide1() {
    this.showtime1 = false;
  }
  digit(v) {

    var pattern = /[0-9]/;
    if (v.data != null && v.data.match(pattern)) {

    }
    else {
      v.target.value = '';
    }
  }

  resetquestion() {
    this.total_question = 0;
    this.total_mark = 0;
    this.questionForm = this._formBuilder.group({
      question: this._formBuilder.array([])
    });

    if (this.testform1.get('subjective').value == 'true') {
      this.testform1.get('marks').clearValidators();
      this.testform1.get('marks').updateValueAndValidity();
      this.testform1.get('negativeMarks').setValue('0');
    }
    else if (this.testform1.get('subjective').value == 'false') {
      this.testform1.get('marks').setValidators(Validators.required);
      this.testform1.get('marks').updateValueAndValidity();
      this.questionForm = this._formBuilder.group({
        question: this._formBuilder.array([])
      });
    }
  }

  addQuestion() {
    var a: FormArray = this.questionForm.get('question') as FormArray;
    this.total_question++;
    if (this.testform1.get('subjective').value == 'true') {
      a.push(this._formBuilder.group({
        questionId: [a.length + 1, Validators.required],
        question: ['', Validators.required],
        marks: ['', Validators.required]
      }));
    }
    else if (this.testform1.get('subjective').value == 'false') {
      a.push(this._formBuilder.group({
        questionId: [a.length + 1, Validators.required],
        text: ['', Validators.required],
        correctOption: ['', Validators.required],
        option: this._formBuilder.array([this.createoption(), this.createoption(), this.createoption(), this.createoption()])
      }));
    }
  }

  createoption(): FormGroup {
    return this._formBuilder.group({
      optionq: ['', Validators.required]
    })
  }

  addOption(j) {
    var a = this.questionForm.get('question') as FormArray;
    var b = a.controls[j].get('option') as FormArray;
    b.push(this.createoption());
  }
  removeoption(j, m) {
    var a = this.questionForm.get('question') as FormArray;
    var b = a.controls[j].get('option') as FormArray;
    b.removeAt(m);
  }

  submit(stepper: MatStepper) {
    this.tvalidation = false;
    if (this.testform1.invalid) {
      this.testform1.markAllAsTouched();
      return;
    }
    var h = Math.floor(this.time.hour + parseInt(this.testform1.get('duration').value) / 60);
    var m = this.time.minute + parseInt(this.testform1.get('duration').value) % 60;
    console.log(h + "  " + m);
    if (this.testform1.get('scheduleOn').value.getDate() == this.testform1.get('resultOn').value.getDate()) {
      if (this.time1.hour < h) {
        this.tvalidation = true;
        return;
      }
      else if (this.time1.hour == h && this.time1.minute < m) {
        this.tvalidation = true;
        return;
      }
      
    }
    stepper.next();
    if (this.questionForm.get('question')['controls'].length < 1) {
      this.addQuestion();
    }

  }

  removequestion(i) {
    this.total_question--;
    var a: FormArray = this.questionForm.get('question') as FormArray;
    a.removeAt(i);
  }

  submit2() {
    console.log(this.questionForm);
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    }
    this.total_mark = 0;
    if (this.testform1.get('subjective').value == 'true') {
      var a = this.questionForm.get('question');
      for (let i of a.value) {
        this.total_mark += parseInt(i.marks);
      }
    }
    else {
      this.total_mark = parseInt(this.testform1.get('marks').value) * this.total_question;
    }
  }

  submit1() {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    this.loader4=true;
    const req = this.testform1.value
    req.createdBy = sessionStorage.getItem('username');
    req.scheduleOn = this.datePipe.transform(req.scheduleOn, 'yyyy-MM-dd') + " " + req.time1;
    req.resultOn = this.datePipe.transform(req.resultOn, 'yyyy-MM-dd') + " " + req.time2;
    req.subjectCode = req.subjectCode.toUpperCase();
    req.section = req.section.toUpperCase();
    delete req.time1;
    delete req.time2;
    if (this.testform1.get('subjective').value == 'true') {
      delete req.marks;
      delete req.negativeMarks;
    }
    console.log(req);
    this.faculty.createTestDetails(req).subscribe((res: any) => {
      if (res) {
        console.log(res);
        if (this.testform1.get('subjective').value == 'true' && res != 0) {
          var ar = this.questionForm.value.question;
          ar.map((x) => {
            x.testId = res.TestId;
          })
          console.log(ar);
          this.faculty.subjective(ar).subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              this.loader4=false;
              console.log(res);
              this.toastr.success('', res.Message, {
                positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
              });
              this.testform1.reset();
              this.questionForm.reset();
              this.myStepper.reset();
              this.goback();
            }
          },
            error => {
              this.spinner.hide();
              this.toastr.show('', 'Something went wrong', {
                positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
              });
              console.log(error);
              this.loader4=false;
            });
        }
        else if (this.testform1.get('subjective').value == 'false' && res != 0) {
          var ar = this.questionForm.value.question;
          ar.map((x) => {
            x.testId = res.TestId;
            x.question = x.text;
            if (x.option.length == 4) {
              x.option1 = x.option[0].optionq;
              x.option2 = x.option[1].optionq;
              x.option3 = x.option[2].optionq;
              x.option4 = x.option[3].optionq;
            }
            else if (x.option.length == 3) {
              x.option1 = x.option[0].optionq;
              x.option2 = x.option[1].optionq;
              x.option3 = x.option[2].optionq;
              x.option4 = null;
            }
            else if (x.option.length == 2) {
              x.option1 = x.option[0].optionq;
              x.option2 = x.option[1].optionq;
              x.option3 = null;
              x.option4 = null;
            }
            delete x.option;
            delete x.text;
            delete x.mark;
          });
          console.log(ar);
          this.faculty.mcq(ar).subscribe((res: any) => {
            if (res) {
              this.spinner.hide();
              console.log(res);
              this.loader4=false;
              this.toastr.success('', res.Message, {
                positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
              });
              this.testform1.reset();
              this.questionForm.reset();
              this.myStepper.reset();
              this.goback();
            }
          },
            error => {
              this.spinner.hide();
              this.toastr.show('', 'Something went wrong', {
                positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
              });
              this.loader4=false;
              console.log(error);
            });
        }
        else {
          this.spinner.hide();
          this.loader4=false;
          this.toastr.show('', 'Something went wrong', {
            positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
          });
        }
      }
    },
      error => {
        this.spinner.hide();
        this.loader4=false;
        console.log(error);
      });

  }

  selectFile(v) {
    this.resetquestion();
    this.csvobject = [];
    this.loader3 = true
    let selectedFile = v.target.files[0];
    if (selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        //console.log(workbook);
        var rowObject = [];
        workbook.SheetNames.forEach(sheet => {
          rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        });
        console.log(rowObject);
        let k = 0;
        var a: FormArray = this.questionForm.get('question') as FormArray;
        this.total_question = 0;
        if (this.testform1.get('subjective').value == 'true') {
          for (let i of rowObject) {
            k++;
            a.push(this._formBuilder.group({
              questionId: [k, Validators.required],
              question: [i.question, Validators.required],
              marks: [i.marks, Validators.required]
            }));
          }
          this.total_question = k;
        } else if (this.testform1.get('subjective').value == 'false') {
          console.log("run this");
          for (let i of rowObject) {
            k++;
            var b = Object.keys(i);
            a.push(this._formBuilder.group({
              questionId: [k, Validators.required],
              text: [i.question, Validators.required],
              correctOption: [rowObject[k - 1]["correct option"], Validators.required],
              option: this._formBuilder.array(this.getFormArray(b, i))
            }));
            this.total_question = k;
          }
        }
        console.log(this.questionForm.get('question').value);
        this.loader3 = false;
        this.buttontype = false;
        this.cdRef.detectChanges();
      }

    }
  }
  getFormArray(b, i) {
    var ar = [];
    b.shift();
    b.pop();
    for (let j of b) {
      ar.push(this._formBuilder.group({ optionq: [i[j], Validators.required] }));
    }
    return ar;
  }

}
