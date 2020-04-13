import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClientService } from 'src/app/service/httpclient.service';


@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent implements OnInit {
  addedtocart = false
  hideme = false
  @Input('product') product: any


  constructor(private authService: AuthenticationService, private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit() {


  }
  public loadComments(productId) {
    this.router.navigate(['/productdetails', productId]);
  }
  public addToCart(id, name, unitPrice, quantity) {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.httpClientService.addToCart(id, name, unitPrice, quantity).subscribe(
      data => {

        this.addedtocart = true;
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.addedtocart = false;

        }, 1000);





      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

}

