import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private httpClientService: HttpClientService, private route: ActivatedRoute, private router: Router) {

  }
  wordSearch
  list
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.paramsChange(params.id);
    });

  }

  paramsChange(id) {
    this.wordSearch = this.route.snapshot.params["searchWord"];

    this.httpClientService.search(this.wordSearch).subscribe(
      res => {
        this.list = res.body
      }
    );

  }





}
