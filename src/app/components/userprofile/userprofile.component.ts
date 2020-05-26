import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClientService } from '../../service/httpclient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';

declare var cloudinary;
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  updateAcc: FormGroup;
  constructor(private cartItemService:CartItemCountService ,public toastr: ToastrService, public dialogRef: MatDialogRef<UserprofileComponent>, private router: Router,
    private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.updateAcc = this.fb.group({
      "email": [{ value: '', disabled: true }],
      "name": ['', [Validators.required, Validators.minLength(4)]],
      "address": ['', [Validators.required, Validators.minLength(4)]],
      "picture":['']
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


    this.updateAcc.patchValue({ picture: '' });

    this.httpClientService.updateUserProfile(this.updateAcc.value)
      .subscribe(data => {
        this.toastr.success('<span>Successfully Updated Profile</span>', "", { enableHtml: true, timeOut: 2000, closeButton: true, positionClass: "toast-top-right" });

      })

    this.dialogRef.close();
  }

  updateAccountPicture() {




    this.httpClientService.updateUserProfile(this.updateAcc.value)
      .subscribe(data => {
        this.toastr.success('<span>Successfully Updated Profile Picture</span>', "", { enableHtml: true, timeOut: 2000, closeButton: true, positionClass: "toast-top-right" });
        this.currentUser.picture=this.updateAcc.get('picture').value;
        localStorage.setItem('image', this.currentUser.picture)
        this.cartItemService.emitProfilePic(this.currentUser.picture);
      
      })

   
  }
 
  showImageUploadDialog(){

    cloudinary.createUploadWidget({
      cloudName: 'surespraja', 
      uploadPreset: 'mbfx97xx'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
        
        
          this.updateAcc.patchValue({ picture: 'https://res.cloudinary.com/surespraja/image/upload/w_100,h_100,c_thumb,g_face,r_max/'+result.info.public_id+'.png' });
          this.updateAccountPicture();



         
         
        }
      }
    ).open();


  }



  closeDialog() {
    this.dialogRef.close();
  }
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }


}
