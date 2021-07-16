import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  subject = new Subject<boolean>();

  constructor(private route: Router) { }

  logout() {
    localStorage.setItem("user", '');
    this.route.navigate(['']);
    this.setSubject();
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
}
