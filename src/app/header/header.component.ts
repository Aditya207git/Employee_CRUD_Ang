import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../shared/logout.service';
import { LoginService } from '../login.service';
import { Location } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  currPath: string;

  constructor(private loginService: LoginService, private location: Location, public logoutService: LogoutService) {
    this.isLoggedIn = false;
    this.currPath = '';
   }

  ngOnInit(): void {
    let user = this.loginService.getLoggedInUser();
    if(user != '') this.isLoggedIn = true;
    
    if(this.location.path() !== '')
      this.currPath = this.location.path();
    
      this.currPath = this.currPath.substr(1);
      console.log(this.currPath);
    
    // subscribe to the observable
    this.logoutService.getSubject().subscribe(data => {
      this.isLoggedIn = data
    })

    // subscribe to the observable
    this.loginService.getSubject().subscribe(data => {
      this.isLoggedIn = data
      this.currPath = 'emp-list'
    })
  }
  logout() {
    this.logoutService.logout();
  }

}
