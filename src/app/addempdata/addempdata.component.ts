

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-addempdata',
  templateUrl: './addempdata.component.html',
  styleUrls: ['./addempdata.component.css']
})
export class AddempdataComponent implements OnInit {

  addEditEmployeeForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, this.noWhiteSpaceValidator]),
    lastName: new FormControl('', [Validators.required, this.noWhiteSpaceValidator],),
    gender: new FormControl('', [Validators.required, this.noWhiteSpaceValidator]),
    grade: new FormControl('', [Validators.required, this.noWhiteSpaceValidator]),
    odcNonOdc: new FormControl(''),
    bu: new FormControl(''),
    project: new FormControl('')
  })

  role: string;
  formTitle: string;
  currEmployee: any;        

  constructor(public dialogRef: MatDialogRef<AddempdataComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar,
                private apiService: ApiService) {

                  this.role = '';
                  this.formTitle = '';
                  this.currEmployee = {};
                }

  ngOnInit(): void {
    this.role = this.data.role;
    if(this.role == 'add')
      this.formTitle = 'Add New Employee';
    else  {
      this.formTitle = 'Edit Employee';
      this.currEmployee = this.data.empData;
      console.log("curr emp", this.currEmployee);
      console.log("id", this.data.id);

      let currOdcNonOdc = this.currEmployee.odcNonOdc;
      let currBu = this.currEmployee.bu;
      let currProj = this.currEmployee.project;
      if(currOdcNonOdc == undefined) currOdcNonOdc = '';
      else currOdcNonOdc = currOdcNonOdc.toLowerCase();
      if(currBu == undefined) currBu = '';
      else currBu = currBu.toLowerCase();
      if(currProj == undefined) currProj = '';
      else currProj = currProj.toLowerCase();
      this.addEditEmployeeForm.controls.firstName.setValue(this.currEmployee.firstName);
      this.addEditEmployeeForm.controls.lastName.setValue(this.currEmployee.lastName);
      this.addEditEmployeeForm.controls.gender.setValue(this.currEmployee.gender);
      this.addEditEmployeeForm.controls.grade.setValue(this.currEmployee.grade);

      this.addEditEmployeeForm.controls.odcNonOdc.setValue(currOdcNonOdc);
      this.addEditEmployeeForm.controls.bu.setValue(currBu);
      this.addEditEmployeeForm.controls.project.setValue(currProj);

    }
      
    console.log(this.role);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  noWhiteSpaceValidator(control: FormControl) {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    const isValid = !isWhiteSpace;
    return isValid ? null : { 'whitespace': true }
  }

  openSnackBar(message: string, action: string, todo: boolean) {
    if(todo){
      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: ['green-snackbar'],
        verticalPosition:'bottom',
        horizontalPosition:'left'
      });
    }
    else{
      this.snackBar.open(message, action, {
        duration: 1500,
        panelClass: ['red-snackbar'],
        verticalPosition:'bottom',
        horizontalPosition:'left'
      });    
    }
    
  }

  onSubmit() {
    if(this.addEditEmployeeForm.valid) {
      
      console.log(this.addEditEmployeeForm.value);

      if(this.role == 'add') {
        this.apiService.addNewEmployee(this.addEditEmployeeForm.value);
        this.openSnackBar("New Employee Added", "Dismiss",true);
      }
      else  {
        this.apiService.updateEmployee(this.addEditEmployeeForm.value, this.data.id);
        this.openSnackBar("Employee Data Updated", "Dismiss",true);
      }

    }
  }

}
