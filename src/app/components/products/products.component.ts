import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  config: any;
  currentPage

  addedtocart = false
  list
  isAdmin: any
  constructor(private route: ActivatedRoute, private router: Router, private httpClientService: HttpClientService) {

    this.config = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
  }
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }



  last;
  ngOnInit() {

    this.currentPage = 1;

    this.last = false;

    this.addedtocart = false
    this.checkIfAdmin();
    this.getProducts();

  }

  public getProducts() {
    this.httpClientService.listProducts(this.currentPage).subscribe(
      data => {
        this.list = data.body.content
        this.last = data.body.last



      }, exception => {
        if (exception.status != 200) {
          this.router.navigate(['/error-page']);
        }
      }
    )
  }





  public checkIfAdmin() {

    this.httpClientService.checkIfAdmin().subscribe(
      data => {
        this.isAdmin = data.body

      }, exp => {
        console.log("ERROR MSG=" + exp)
      }


    );
  }



}
