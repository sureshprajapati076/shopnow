import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClientService } from '../../service/httpclient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private router: Router, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.addComment = this.fb.group({
      "productId": [''],
      "comment": ['', Validators.required],
      "stars": ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }
  comments
  loading = true
  ngOnInit() {
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
      this.loading = false
    }, exception => {
    }
    );
  }
  public submitForm() {
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
  public submitReply(id, i) {
    console.log(this.reply[i]);

    if (this.reply[i] !== '' && this.reply[i] != undefined) {
      this.httpClientService.addReply(this.reply[i], id).subscribe(data => {
        this.hideme[i] = !this.hideme[i];
        this.reply[i] = "";
        this.ngOnInit();
      });
    }



  }
}
