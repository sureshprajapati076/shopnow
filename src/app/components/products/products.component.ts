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
  ngOnInit() {

    this.currentPage = 1;
    this.last = false;
    this.addedtocart = false
    this.getProducts();


  }
  public getProducts() {
    this.cachedService.getProducts(this.currentPage).subscribe(
      data => {

        this.list = data.body.content
        this.list = this.list.map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);


        this.last = data.body.last

      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/error-page']);
        }
      }
    )
  }
}
