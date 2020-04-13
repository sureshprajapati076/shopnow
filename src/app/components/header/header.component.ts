import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/httpclient.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {




  //  user;
  constructor(public router: Router, public loginService: AuthenticationService, private httpClient: HttpClient) { }
  ngOnInit() {
    //   this.user = localStorage.getItem('username')
  }
  logOut() {
    // localStorage.removeItem('username')
    localStorage.clear();
    this.router.navigate(['login'])
  }









}
