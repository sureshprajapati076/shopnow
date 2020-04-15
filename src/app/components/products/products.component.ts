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


  addedtocart = false
  list
  isAdmin: any
  constructor(private route: ActivatedRoute, private router: Router, private httpClientService: HttpClientService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 6,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);
  }
  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }

  ngOnInit() {





    this.addedtocart = false
    this.checkIfAdmin();

    this.httpClientService.listProducts().subscribe(
      data => {
        this.list = data.body
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
