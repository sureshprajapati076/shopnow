import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClientService } from '../../service/httpclient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  hideme = [];
  comment;
  reply = [];
  id;
  stars;
  toggle = true;
  productId: any;
  product: any;
  addComment: FormGroup;
  constructor(private authService: AuthenticationService,
    private router: Router, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.addComment = this.fb.group({
      "productId": [''],
      "comment": ['', Validators.required],
      "stars": ['',]
    });
  }
  comments
  loading = true
  isVerified;

  ngOnInit() {


    if (this.authService.isUserLoggedIn()) {


      this.httpClientService.getUserDetails().subscribe(res => {

        this.isVerified = res.body.isVerified;
      });
    } else {
      this.isVerified = 'GUEST'
    }



    this.productId = this.activatedRoute.snapshot.params["productId"];


    this.httpClientService.getItemById(this.productId).subscribe(
      data => {
        this.product = data.body
      },
      exp => {
        this.router.navigate(['/error-page']);
      }

    );
    this.httpClientService.loadComments(this.productId).subscribe(data => {
      this.comments = data.body
      this.comments.reverse();



      this.loading = false
    }, exception => {
    }
    );

  }




  public sendCode() {

    this.httpClientService.sendVerificationCode().subscribe(res => {
      alert('Code Sent to your email')
      this.codeSent = 1
    });

  }
  verificationCode;
  invalidcodemessage
  codeSent
  public verify() {
    this.httpClientService.veryfyCode(this.verificationCode).subscribe(res => {

      this.isVerified = 'YES';

      this.ngOnInit();


    },
      err => {
        this.invalidcodemessage = 'true'
      }





    );

  }

  public submitForm(stars) {
    if (this.addComment.valid) {
      this.addComment.patchValue({ stars: stars });
      this.addComment.patchValue({ productId: this.product.id });
      this.httpClientService.postComment(this.addComment.value).subscribe(
        data => {
          this.toggle = !this.toggle
          this.addComment.reset();
          this.ngOnInit();
        }, exp => {
          console.log(exp)
        }
      );
    }
  }
  public submitReply(id, i) {


    if (this.reply[i] !== '' && this.reply[i] != undefined) {
      this.httpClientService.addReply(this.reply[i], id).subscribe(data => {
        this.hideme[i] = !this.hideme[i];
        this.reply[i] = "";
        this.ngOnInit();
      });
    }



  }
}
