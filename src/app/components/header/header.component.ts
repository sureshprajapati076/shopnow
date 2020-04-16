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
  makeSearch() {
    this.httpClient.search(this.searchWord).subscribe(
      res => {


        this.router.navigate(['search'], { state: { data: JSON.stringify(res.body) } });
      }

    );
  }









}
