import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'app/shared/services/student.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-studentadd',
  templateUrl: './studentadd.component.html',
  styleUrls: ['./studentadd.component.scss']
})
export class StudentaddComponent implements OnInit {
  branch = [{ name: 'Information Technology', value: 'IT' }, { name: 'Mechanical Engineering', value: 'ME' }, { name: 'Computer Science', value: 'CSE' }];
  sem = [{ name: 'First Semester', value: '1' }, { name: 'Second Semester', value: '2' }, { name: 'Third Semester', value: '3' }, { name: 'Fourth Semester', value: '4' }, { name: 'Fifth Semester', value: '5' },
  { name: 'Sixth Semester', value: '6' }, { name: 'Seventh Semester', value: '7' }, { name: 'Eighth Semester', value: '8' }]
  loader3 = false;
  csvobject: any = [];
  buttontype = true;
  studentForm: FormGroup;
  displayedColumns: string[] = ['s_no', 'student_roll', 'student_name', 'student_email', 'password', 'branch', 'semester', 'section']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private location: Location, private fb: FormBuilder,
    private cdRef: ChangeDetectorRef, private student: StudentService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.initform();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  initform(): void {

    this.studentForm = this.fb.group({
      rollNo: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])],
      branch: ['', Validators.required],
      sem: ['', Validators.required],
      section: ['', Validators.required]
    });
  }
  goback() {
    this.location.back();
  }

  selectFile(v) {
    this.csvobject = [];
    this.loader3 = true;
    let selectedFile = v.target.files[0];
    if (selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        var rowObject = [];
        workbook.SheetNames.forEach(sheet => {
          rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          let k = 0;
          for (let i of rowObject) {
            i.rollNo = i['roll no'];
            delete i['roll no'];
            rowObject[k] = i;
            k++;
          }
        });
        this.dataSource = new MatTableDataSource<any>(rowObject);
        this.csvobject=rowObject;
        this.loader3 = false;
        this.buttontype = false;
        this.cdRef.detectChanges();
      }
    }
  }


  submit() {
    console.log(this.studentForm);
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.studentForm.markAsDirty();
    }
    this.studentForm.get('section').setValue(this.studentForm.get('section').value.toUpperCase());
    this.student.addStudent(this.studentForm.value).subscribe((res: any) => {
      if (res) {
        this.toastr.success('', res[0], {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        this.studentForm.reset();
        this.cdRef.detectChanges();
        this.goback();
      }
    },
      error => {
        this.toastr.show('', error.error[0], {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        console.log(error);
      });

  }

  submitcsv() {
    this.student.addStudentCsv(this.csvobject).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.toastr.success('', res[0], {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        this.goback();
      }
    }, error => {
      this.toastr.show('', error.error[0], {
        positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
      });
      console.log(error);
    })
  }

}
