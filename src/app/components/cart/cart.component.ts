import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private cartItemService: CartItemCountService, private router: Router, private httpClientService: HttpClientService) { }
  visibleRowIndex = [];
  cart;
  totalCost;
  subject: Subject<any> = new Subject();
  ngOnInit() {
    this.itemcounttoadd = 0
    this.subject
      .pipe(debounceTime(500))
      .subscribe((item) => {
        let product = this.cart.productsInCart[item.id];
        this.httpClientService.addToCart(product.productId, product.imageUrl, product.name, product.unitPrice, item.quantity).subscribe(
          () => {
            this.cartItemService.emitValue(item.quantity);

            this.totalCost += product.unitPrice * item.quantity;
          }
        );
        this.itemcounttoadd = 0;
      }
      );
    this.loadCart();
  }
  itemcounttoadd: number
  additems(i): void {
    this.cart.productsInCart[i].quantity += 1;
    this.itemcounttoadd++;
    this.subject.next({ "id": i, "quantity": this.itemcounttoadd });
  }

  public loadCart() {
    this.cart = null;
    this.totalCost = 0;
    this.httpClientService.showCart().subscribe(
      data => {
        if (data.status == 200) {
          this.cart = data.body
          if (this.cart.productsInCart) {
            for (let product of this.cart.productsInCart) {
              this.totalCost = this.totalCost + product.unitPrice * product.quantity;
            }
          }
        }
      }, exp => {
        this.router.navigate(['/login']);
      }
    );
  }
  public saveForLater(i, id, price, amount) {
    this.totalCost = this.totalCost - price * amount;
    this.httpClientService.saveForLater(id).subscribe(
      data => {

        this.cartItemService.emitValue(-amount);
        this.visibleRowIndex[i] = true;




        // this.loadCart();
      }
    );
  }
  public makepayment() {
    this.httpClientService.makePayment().subscribe(data => {
      if (data.status == 200) {
        this.cartItemService.clearCounter();

        this.router.navigate(['/'])
      } else {
        this.router.navigate(['/error-page'])
      }
    });
  }
  public minusone(i) {
    let product = this.cart.productsInCart[i];
    if (this.cart.productsInCart[i].quantity == 1) {
      if (!confirm('sure to remove?')) {
        return;
      }
    }
    this.httpClientService.removeFromCart(product.productId, product.name, product.unitPrice, product.quantity).subscribe(
      data => {
        product.quantity -= 1
        this.totalCost -= product.unitPrice;
        if (product.quantity == 0) {
          this.visibleRowIndex[i] = true;
        }
        this.cartItemService.emitValue(-1);
      }
    );
  }
}
