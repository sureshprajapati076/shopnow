import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {




  addedtocart = false
  list
  isAdmin: any
  constructor(private authService: AuthenticationService, private router: Router, private httpClientService: HttpClientService) { }
  ngOnInit() {





    this.addedtocart = false
    this.checkIfAdmin();

    this.httpClientService.listProducts().subscribe(
      data => {
        this.list = data.body
      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/error-page']);
        }
      }
    )
  }
  public checkIfAdmin() {

    this.httpClientService.checkIfAdmin().subscribe(
      data => {
        this.isAdmin = data.body

      }, exp => {
        console.log("ERROR MSG=" + exp)
      }


    );
  }



}
