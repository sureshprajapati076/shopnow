import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheForProductListService } from 'src/app/service/cache-for-product-list.service';
import { AuthenticationService } from 'src/app/service/authentication.service';



declare var paypal;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {




  currentPage
  addedtocart = false
  list: Array<any>
  constructor(public authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private httpClientService: HttpClientService, public cachedService: CacheForProductListService) {
  }
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }
  last;
  randomize: Array<number>
  ngOnInit() {

    this.cachedService.allLoaded = false;











    this.randomize = this.cachedService.getRandomArray();

    // this.currentPage = this.cachedService.getCurrentPage();
    this.last = false;
    this.addedtocart = false
    this.getProducts();
  }
  public getProducts() {
    this.cachedService.getProducts(this.cachedService.currentPage).subscribe(
      data => {
        this.list = data.body.content
        let arr = [];
        for (let i = 0, j = 0; i < this.list.length;) {
          if (this.randomize[j] >= this.list.length) {
            j++;
          } else {
            arr[i] = this.list[this.randomize[j]]
            i++; j++;
          }
        }
        this.list = arr
        this.last = data.body.last
        this.cachedService.allLoaded = true;
      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/error-page']);
        }
      }
    )
  }
}
