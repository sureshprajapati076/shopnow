import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/httpclient.service';
import { AuthenticationService } from '../../service/authentication.service';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  createAcc: FormGroup;
  constructor(private authService: AuthenticationService, private router: Router,
    private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.createAcc = this.fb.group({
      "email": ['', Validators.required],
      "password": ['', Validators.required],
      "name": ['', Validators.required],
      "address": ['', [Validators.required, Validators.minLength(4)]],
      "roles": ['', Validators.required]
    });
  }
  ngOnInit() {
    if (this.authService.isUserLoggedIn()) this.router.navigate(['/']);
  }
  createAccount() {
    this.httpClientService.addUser(this.createAcc.value)
      .subscribe(data => {
        if (data === null) {
          this.router.navigate(['signup'])
          return false;
        }
        this.router.navigate(['login']);
        return true;
      })
  }
}
