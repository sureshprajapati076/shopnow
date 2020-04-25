import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ApplicationConstants } from '../components/constants/application-constant';
import { ApiService } from './api.service';
import { Router, NavigationStart } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CacheForProductListService {





  map: Map<String, Observable<any>>;
  randomize: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  cpy: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  currentPage: number
  constructor(private apiService: ApiService) {
    this.currentPage = 1
    this.map = new Map<String, Observable<any>>();

  }
  public getProducts(page) {
    const API_ENDPOINT = ApplicationConstants.API_PATH.getproducts + '?pageNumber=' + page;
    if (this.map.has(API_ENDPOINT)) {
      return this.map.get(API_ENDPOINT);
    }
    this.map.set(API_ENDPOINT, this.apiService.get(API_ENDPOINT).pipe(shareReplay(1)));
    return this.map.get(API_ENDPOINT);
  }
  public resetCache() {
    this.map.clear();
  }

  public getCurrentPage() {
    return this.currentPage
  }
  public incPageNumber() {
    this.currentPage++;
  }
  public decPageNumber() {
    this.currentPage--;
  }


  public getRandomArray() {
    if (localStorage.getItem('rdn') === null || JSON.stringify(this.randomize) === JSON.stringify(this.cpy)) {

      this.randomize = this.randomize.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      localStorage.setItem('rdn', 'true')

    }
    return this.randomize;
  }


}