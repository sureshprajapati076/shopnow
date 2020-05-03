import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/httpclient.service';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private cartItemService: CartItemCountService, private router: Router, private httpClientService: HttpClientService) { }

  cart;
  totalCost;
  visibleRowIndex = [];

  ngOnInit() {
    this.cart = null;
    this.totalCost = 0;
    this.httpClientService.showCart().subscribe(
      data => {
        if (data.status == 200) {
          this.cart = data.body
          if (this.cart.saveForLater) {
            for (let product of this.cart.saveForLater) {


              this.totalCost = this.totalCost + product.unitPrice * product.quantity;
            }
          }
        }

      }, exp => {
        this.router.navigate(['/login']);
      }
    );
  }
  showDetails(id) {
    this.httpClientService.getItemById(id).subscribe(
      data => {
        sessionStorage.setItem('product', JSON.stringify(data.body));
        this.router.navigate(['/productdetails']);
      },
      exp => {
        this.router.navigate(['/error-page']);
      })


  }
  public putBack2Cart(i, id, cost, total) {
    this.totalCost = this.totalCost - cost * total;
    this.httpClientService.putBack2Cart(id).subscribe(
      data => {
        this.cartItemService.emitValue(total);
        this.visibleRowIndex[i] = true;
        // this.ngOnInit();
      }


    );

  }


}
