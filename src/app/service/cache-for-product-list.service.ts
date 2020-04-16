import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ApplicationConstants } from '../components/constants/application-constant';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class CacheForProductListService {
  map: Map<String, Observable<any>>;
  constructor(private apiService: ApiService) {
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
}