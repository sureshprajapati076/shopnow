import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/httpclient.service';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';
import { CacheForProductListService } from 'src/app/service/cache-for-product-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private cacheService: CacheForProductListService, private cartItemService: CartItemCountService, private router: Router, private httpClientService: HttpClientService) { }

  cart;
  totalCost;
  visibleRowIndex = [];

  ngOnInit() {
    this.cacheService.allLoaded = false;
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
          this.cacheService.allLoaded = true;
        }

      }, exp => {
        this.router.navigate(['/login']);
      }
    );
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
