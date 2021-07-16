import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  
  constructor( private loginService: LoginService,private router: Router, private snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    if(this.loginService.isUserLoggedIn())
    this.router.navigate(['emp-list'])

    this.loginForm.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    if(this.loginForm.valid) {
      let email = this.loginForm.value['email'];
      let password = this.loginForm.value['password'];
      if(this.loginService.isValidDetails(email, password)) {
        this.openSnackBar("Login Success", "Dismiss", true);
        this.router.navigate(['employee']);

        localStorage.setItem("user", JSON.stringify({
          email: email,
          password: password
        }));
        this.loginService.login();
      }
      else {
        this.openSnackBar("Login Failed", "Dismiss", false);
      }
    }
    else {
      this.openSnackBar("Incorrect Details", "Dismiss", false);
    }
  }
  openSnackBar(message: string, action: string, todo: boolean ) {
    if(todo)
    {
      this.snackBar.open(message, action, {
        duration: 1500,
        panelClass: ['green-snackbar'],
        verticalPosition:'bottom',
        horizontalPosition:'left'
      });
    }

    else{
      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: ['red-snackbar'],
        verticalPosition:'bottom',
        horizontalPosition:'left'
      });
    }
        
  }
}
