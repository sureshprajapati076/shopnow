import { Injectable, EventEmitter } from '@angular/core';
import { HttpClientService } from './httpclient.service';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class CartItemCountService {

  emitter = new EventEmitter<number>();
  profilePicEmitter = new EventEmitter<String>();
  count: number;
  constructor(private authService: AuthenticationService, private httpClientService: HttpClientService) {

    this.count = 0

  }

  emitValue(value: number) {
    this.count += value;
    this.emitter.emit(this.count)
  }
  clearCounter() {
    this.count = 0;
    this.emitValue(0);
  }
  emitProfilePic(value: String) {
    this.profilePicEmitter.emit(value)

  }
}
