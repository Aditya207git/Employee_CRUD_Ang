import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  email: string = "admin@persistent.com";
  password: string = "BookingAdmin";
  subject = new Subject<boolean>();
  constructor() { }


  isValidDetails(email: string, password: string): boolean {
    if(this.email === email && this.password === password)
      return true;
    else 
      return false;
  }

  getLoggedInUser() {
    let user = localStorage.getItem("user");
    console.log("user: "+user);
    return user;
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("user");
    if(user == '' || user == undefined)
      return false;
    else  
      return true;
  }

  setSubject() {
    let res = this.isUserLoggedIn();
    this.subject.next(res);
  }
  getSubject(): Observable<boolean> {
    return this.subject.asObservable();
  }

  login() {
    this.setSubject();
  }
}
