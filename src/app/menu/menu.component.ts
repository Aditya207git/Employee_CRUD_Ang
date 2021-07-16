import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveempdataComponent } from '../removeempdata/removeempdata.component';
import { AddempdataComponent } from '../addempdata/addempdata.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { Component, OnInit } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() currEmployee: any;
  

  choice: string;
  response: string;
  isActive: boolean;
  activeStatus: string ;
  
  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.choice = '';     
    console.log("Constructor run");
    this.response = '';
    this.isActive = false;
    this.activeStatus = 'Active';
   }

  ngOnInit(): void {
    if(this.currEmployee.activated == undefined) 
    {
      this.isActive = false;
      console.log("ngonit1");
    }
    else {
      this.isActive = this.currEmployee.activated;
      console.log("ngonit2");
    }

    if(this.isActive){
      console.log("ngonit3");
      this.activeStatus = 'De-Activate';
    }
    
  }

  // change:boolean=false;
  toggleActivate() {
    if(this.isActive==false){
      this.isActive=true;
      console.log("tgrun1");
    }
    else{
      this.isActive=false;
      console.log("tgrun2");
    }
    this.currEmployee.activated=this.isActive;
    console.log("tgrun3");
    this.apiService.updateEmployee(this.currEmployee, this.currEmployee.id);

    if(this.currEmployee.activated){
      console.log("tgrun4");
      this.openSnackBar("Activated","Dismiss",true);
    }
    else{
      console.log("tgrun5");
      this.openSnackBar("De-Activated","Dismiss",false);
    }
  }

  viewEmployee(){
      //display component  
  }

  openEditEmployee() {
    let dialogRef = this.dialog.open(AddempdataComponent, {
      height: '100%',
      width: '35%',
      data: {
        role: 'edit',
        empData: this.currEmployee,
        id: this.currEmployee.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.response = result;
    });
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

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(RemoveempdataComponent, {
      width: '550px',
      data: {
        choice: this.choice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.choice = result;
      if(this.choice == 'yes') {
        this.deleteEmployee(); 
      }
    })
  }

  deleteEmployee() {
    this.apiService.deleteEmployee(this.currEmployee);
    this.openSnackBar("Employee Deleted", "Dismiss",true);
  }
}
