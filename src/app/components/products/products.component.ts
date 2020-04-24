import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CacheForProductListService } from 'src/app/service/cache-for-product-list.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  currentPage
  addedtocart = false
  list: Array<any>
  constructor(public authService: AuthenticationService, private route: ActivatedRoute, private router: Router, private httpClientService: HttpClientService, private cachedService: CacheForProductListService) {
  }
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }
  last;
  randomize: Array<number>
  ngOnInit() {
    this.randomize = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    this.randomize = this.randomize.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    this.currentPage = 1;
    this.last = false;
    this.addedtocart = false
    this.getProducts();
  }
  public getProducts() {
    this.cachedService.getProducts(this.currentPage).subscribe(
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
      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/error-page']);
        }
      }
    )
  }
}
