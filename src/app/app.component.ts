import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CacheForProductListService } from './service/cache-for-product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private cdref: ChangeDetectorRef, public service: CacheForProductListService) { }

  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }



}
