import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/httpclient.service';
import { HttpClient } from '@angular/common/http';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  searchWord

  cartItemCount;


  constructor(private authService: AuthenticationService, private httpClientService: HttpClientService, private cartItemCounterService: CartItemCountService, public router: Router, public loginService: AuthenticationService, private httpClient: HttpClientService) { }
  ngOnInit() {
    this.cartItemCounterService.emitter.subscribe(data => this.cartItemCount = data);

    if (this.authService.isUserLoggedIn()) {

      this.httpClientService.showCart().subscribe(
        res => {
          let count = 0;

          if (res.body.productsInCart) {
            for (let product of res.body.productsInCart) {
              count += product.quantity;
            }
          }
          this.cartItemCount = count;
          this.cartItemCounterService.emitValue(count);



        }
      );
    }




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
