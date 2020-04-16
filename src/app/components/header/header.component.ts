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


  searchWord


  constructor(public router: Router, public loginService: AuthenticationService, private httpClient: HttpClientService) { }
  ngOnInit() {


  }
  logOut() {

    localStorage.clear();
    this.router.navigate(['login'])
  }
  placeHolderMsg = 'Search...'
  makeSearch() {
    if (!this.searchWord || this.searchWord == undefined || this.searchWord.length < 4) {
      this.searchWord = ''
      this.placeHolderMsg = 'At least 4 characters to make search';
      setTimeout(() => {
        this.placeHolderMsg = 'Search...'
      }, 2000);


    } else {
      this.router.navigate(['/search/' + this.searchWord]);
    }
  }









}
