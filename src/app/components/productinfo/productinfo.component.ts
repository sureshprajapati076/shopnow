import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';
import { ToastrService } from 'ngx-toastr';
import { CacheForProductListService } from 'src/app/service/cache-for-product-list.service';
@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent implements OnInit {
  hideme = false
  @Input('product') product: any
  constructor(private cacheService: CacheForProductListService, private toastr: ToastrService, private cartItemService: CartItemCountService, private authService: AuthenticationService, private router: Router, private httpClientService: HttpClientService) { }
  ngOnInit() {
  }
  showDetails() {
    this.httpClientService.getItemById(this.product.id).subscribe(
      data => {
        sessionStorage.setItem('product', JSON.stringify(data.body));
        this.router.navigate(['/productdetails']);
      },
      exp => {
        this.router.navigate(['/error-page']);
      })


  }
  showSuccess() {
    this.toastr.success('<span>Item Added To Cart</span>', "", { enableHtml: true, timeOut: 2000, closeButton: true, positionClass: "toast-top-right" });
  }
  public addToCart(id, imageUrl, name, unitPrice, quantity) {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.httpClientService.addToCart(id, imageUrl, name, unitPrice, quantity).subscribe(
      () => {

        this.cartItemService.emitValue(1);

        this.showSuccess();
      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
