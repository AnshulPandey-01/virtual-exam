import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../shared/services/faculty.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-facultyadd',
  templateUrl: './facultyadd.component.html',
  styleUrls: ['./facultyadd.component.scss']
})
export class FacultyaddComponent implements OnInit {
  facultyForm: FormGroup;
  loader3 = false;
  csvobject: any = [];
  buttontype = true;
  displayedColumns: string[] = ['s_no', 'faculty_name', 'faculty_email', 'Action']
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort;
  rowObject = [];
  constructor(private location: Location, private fb: FormBuilder,
    private cdRef: ChangeDetectorRef, private faculty: FacultyService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.initform();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  initform(): void {
    this.facultyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])]
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
        workbook.SheetNames.forEach(sheet => {
          this.rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        });
        this.dataSource = new MatTableDataSource<any>(this.rowObject);
        console.log(this.rowObject);
        this.loader3 = false;
        this.buttontype = false;
        this.cdRef.detectChanges();
      }
    }

  }

  submit() {
    console.log(this.facultyForm);
    if (this.facultyForm.invalid) {
      this.facultyForm.markAllAsTouched();
      this.facultyForm.markAsDirty();
    }
    this.faculty.addFaculty(this.facultyForm.value).subscribe((res: any) => {
      if (res) {
        this.toastr.success('', res[0], {
          positionClass: 'toast-bottom-center', closeButton: true, "easeTime": 500
        });
        this.facultyForm.reset();
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
    this.faculty.addFacultyCsv(this.rowObject).subscribe((res: any) => {
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
