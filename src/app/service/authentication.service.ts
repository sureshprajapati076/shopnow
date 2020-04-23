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

  user: any
  authenticate(username, password) {
    return this.httpClient.post<any>(ApplicationConstants.API_PATH.login, { username, password }).pipe(
      map(
        userData => {



          localStorage.setItem('username', username)
          let tokenStr = 'Bearer ' + userData.token;
          localStorage.setItem('token', tokenStr);


          this.httpClient.get(ApplicationConstants.API_PATH.getuserdetails).subscribe(
            res => {

              this.user = res

              if (this.user.roles.indexOf("ADMIN") !== -1) {
                localStorage.setItem('role', 'ADMIN')
              } else {
                localStorage.setItem('role', 'OTHERS')
              }
              localStorage.setItem('username', this.user.name)

            }
          );


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
  isAdmin() {
    return localStorage.getItem('role') === 'ADMIN'
  }


  getUserName() {
    if (localStorage.getItem('username'))
      return localStorage.getItem('username')
    else
      return 'Guest'
  }
}