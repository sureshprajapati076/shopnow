import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { AuthenticationService } from '../../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  updateAcc: FormGroup;
  constructor(private authService: AuthenticationService, private router: Router,
    private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.updateAcc = this.fb.group({
      "email": [{ value: '', disabled: true }],
      "name": ['', Validators.minLength(4)],
      "address": ['', [Validators.minLength(4)]]
    });
    // this.updateAcc.controls['email'].disable();
  }

  currentUser;
  ngOnInit() {
    this.httpClientService.getUserDetails().subscribe(

      data => {

        this.currentUser = data.body

        this.updateAcc.patchValue({ name: this.currentUser.name });
        this.updateAcc.patchValue({ address: this.currentUser.address });




      });
  }

  updateAccount() {




    this.httpClientService.updateUserProfile(this.updateAcc.value)
      .subscribe(data => {
        if (data === null) {
          this.router.navigate(['signup'])
          return false;
        }
        this.router.navigate(['products']);
        return true;
      })
  }

}
