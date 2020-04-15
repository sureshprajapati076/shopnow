import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/httpclient.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-myorderhistory',
  templateUrl: './myorderhistory.component.html',
  styleUrls: ['./myorderhistory.component.css']
})
export class MyorderhistoryComponent implements OnInit {

  constructor(private router: Router, private httpClientService: HttpClientService) { }
  orderhistory;
  loading = true;

  ngOnInit() {

    this.httpClientService.getMyOrder().subscribe(
      data => {
        if (data.status == 200) {

          this.orderhistory = data.body
          this.loading = false;


        } else {
          this.router.navigate(['/error-page'])
        }
      }, exp => {
        this.router.navigate(['/login']);
      }
    );
  }


}