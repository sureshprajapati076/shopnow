import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClientService } from '../../service/httpclient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CacheForProductListService } from 'src/app/service/cache-for-product-list.service';
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
  replyToComment: Array<FormGroup> = []
  constructor(private cacheService: CacheForProductListService,
    private authService: AuthenticationService,
    private router: Router, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.addComment = this.fb.group({
      "productId": [''],
      "comment": ['', Validators.required],
      "stars": ['',]
    });
  }
  comments = []
  loading = true
  isVerified;

  ngOnInit() {
    if (!sessionStorage.getItem('product')) {
      this.router.navigate(['/home']);
    }


    if (this.authService.isUserLoggedIn()) {


      this.httpClientService.getUserDetails().subscribe(res => {

        this.isVerified = res.body.isVerified;

      });
    } else {
      this.isVerified = 'GUEST'
    }



    //this.productId = this.activatedRoute.snapshot.params["productId"];  for retrieving argument or params


    this.product = JSON.parse(sessionStorage.getItem('product'));




    this.httpClientService.loadComments(this.product.id).subscribe(data => {
      this.comments = data.body
      this.comments.reverse();

      for (let i = 0; i < this.comments.length; i++) {
        this.replyToComment[i] = this.fb.group({

          "reply": ['', Validators.required],

        });

      }


      this.loading = false
    }, exception => {
    }
    );

  }




  public sendCode() {

    this.buttonDisabled = true
    this.httpClientService.sendVerificationCode().subscribe(res => {
      alert('Code Sent to your email')
      this.codeSent = true
      this.buttonDisabled = false
    });

  }
  verificationCode;
  invalidcodemessage
  codeSent = false;
  buttonDisabled = false;
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

    this.httpClientService.addReply(this.replyToComment[i].get('reply').value, id).subscribe(data => {
      this.hideme[i] = !this.hideme[i];

      this.ngOnInit();
    });




  }
}
