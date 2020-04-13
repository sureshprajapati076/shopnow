import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApplicationConstants } from '../components/constants/application-constant';

export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    return this.httpClient.post<any>(ApplicationConstants.API_PATH.login, { username, password }).pipe(
      map(
        userData => {
          localStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          localStorage.setItem('token', tokenStr);
          return userData;
        }
      )

    );
  }


  isUserLoggedIn() {
    let user = localStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    localStorage.removeItem('username')
    // localStorage.setItem('username', 'Guest')
  }
  getUserName() {
    if (localStorage.getItem('username'))
      return localStorage.getItem('username')
    else
      return 'Guest'
  }
}