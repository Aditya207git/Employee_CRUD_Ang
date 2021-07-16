import { LoginService } from './../login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddempdataComponent } from '../addempdata/addempdata.component';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './employeedata'; 
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../shared/api.service';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  response: string;

  employeeData: Employee[];

  displayedCols: string[] = ['firstName', 'lastName', 'id', 'gender', 'grade', 'odcNonOdc', 'bu', 'project', 'actions']
  //_id
  dataSource: any;


  @ViewChild(MatPaginator) paginator: any;
  constructor(private login:LoginService, private router :Router,public dialog: MatDialog, private apiService: ApiService) {
    this.response = '';
    this.paginator = '';
    this.employeeData = [];
  }

  ngOnInit(): void {
    if(!this.login.isUserLoggedIn()){
      this.router.navigate(['']);
    }
  }

  ngAfterViewInit() {
    
    this.apiService.getAllEmployees().subscribe(newEmployeeData => {
      this.employeeData = newEmployeeData;
      this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
      this.dataSource.paginator = this.paginator;
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddempdataComponent, {
      height: '90%',
      width: '40%',
      data: {
        role: 'add'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log("Button clicked is:", result);
      this.response = result;
    });
  }
}
