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
  public addToCart(id, imageUrl, name, unitPrice, quantity) {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.httpClientService.addToCart(id, imageUrl, name, unitPrice, quantity).subscribe(
      () => {
        this.addedtocart = true;
        setTimeout(() => {
          this.addedtocart = false;
        }, 800);
      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
