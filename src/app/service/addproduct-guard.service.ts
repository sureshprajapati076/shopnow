import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { HttpClientService } from './httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class AddproductGuardService implements CanActivate {
  result;
  constructor(private httpClientService: HttpClientService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.httpClientService.checkIfAdmin().pipe(map(
      data => {

        this.result = data.body
        if (this.result.role == 'ADMIN') {
          return true;
        }
        this.router.navigate(['/error-page'])
        return false;
      }
    ));
  }
}
