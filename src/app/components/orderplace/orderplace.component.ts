import { Component, OnInit } from '@angular/core';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderplace',
  templateUrl: './orderplace.component.html',
  styleUrls: ['./orderplace.component.css']
})
export class OrderplaceComponent implements OnInit {

  order: any
  constructor(private router: Router, private cartItemService: CartItemCountService) {


  }

  ngOnInit() {
    this.order = this.cartItemService.getOrder();

    if (this.cartItemService.getOrder() == null) {
      this.router.navigate(['order-history']);
    }
    this.cartItemService.clearOrder();
  }

}
