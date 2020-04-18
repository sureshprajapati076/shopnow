import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApplicationConstants } from '../components/constants/application-constant';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private apiService: ApiService) { }
  public getUserDetails(): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.getuserdetails);
  }
  public updateUserProfile(user: any) {
    return this.apiService.post(ApplicationConstants.API_PATH.updateuser, user);
  }
  public search(name) {
    return this.apiService.get(ApplicationConstants.API_PATH.search + '?name=' + name);
  }
  public listProducts(page): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.getproducts + '?pageNumber=' + page);
  }
  public getVendors(): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.getvendors);
  }
  public sendVerificationCode(): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.sendcode);
  }
  public veryfyCode(code: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.verifycode, code);
  }

  public showCart(): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.getcartitems);
  }
  public getItemById(id: string): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.getitembyid + id);
  }
  public addUser(user: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.signup, user);
  }
  public socialLogIn(token: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.sociallogin, token);
  }
  public addProduct(product: any): Observable<any> {

    return this.apiService.post(ApplicationConstants.API_PATH.addproduct, product);
  }
  public addVendor(vendor: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.addvendor, vendor);
  }
  public postComment(comment: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.addcomment, comment);
  }
  public addReply(comment: any, id: string): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.addreply + id, { comment });
  }
  public addToCart(productId: any, imageUrl: any, name: any, unitPrice: any, quantity: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.addtocart, { productId, imageUrl, name, unitPrice, quantity });
  }
  public removeFromCart(productId: any, name: any, unitPrice: any, quantity: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.removefromcart, { productId, name, unitPrice, quantity });
  }
  public saveForLater(productId: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.saveforlater, { productId });
  }
  public putBack2Cart(productId: any): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.putback2cart, { productId });
  }
  public makePayment(): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.makepayment, {});
  }
  public loadComments(id: string): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.loadcomment + id);
  }
  public getMyOrder(): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.myorderhistory);
  }
}