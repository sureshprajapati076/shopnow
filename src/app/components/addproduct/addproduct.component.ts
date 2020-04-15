import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { PhoneValidator } from './validator';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  /*   
    "name":"coke bottle",
    "description":"good choco ",
    "expiryDate":"2020-09-12",
    "quantity":100,
    "unitPrice":2.3,
    "vendor":{"id":1}
     */
  newProduct: FormGroup;
  newVendor: FormGroup
  constructor(private router: Router,
    private httpClientService: HttpClientService, private fb: FormBuilder) {
    this.newProduct = this.fb.group({
      "name": ['', Validators.required],
      "description": ['', Validators.required],
      "imageUrl": [''],
      "expiryDate": ['', Validators.required],
      "quantity": ['', Validators.required],
      "unitPrice": ['', Validators.required],
      "vendor": ['', Validators.required]
    });
    this.newVendor = this.fb.group({
      "name": ['', Validators.required],
      "address": ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      "phone": ['', [Validators.required, PhoneValidator]]
    });
  }
  selectedVendor
  vendors;
  ngOnInit() {
    this.selectedVendor = '17626e5c-ae61-490d-bd9f-8878560d3330'
    this.loadVendors();
  }
  loadVendors() {
    this.httpClientService.getVendors().subscribe(data => {
      this.vendors = data.body
    });
  }
  addProduct() {
    this.newProduct.patchValue({ vendor: { id: this.newProduct.get("vendor").value } });
    if (this.newProduct.get('imageUrl').value === '') {
      this.newProduct.patchValue({ 'imageUrl': 'default.png' })
    }
    this.httpClientService.addProduct(this.newProduct.value)
      .subscribe(data => {
        this.newProduct.reset();
      })
  }
  addVendor() {
    this.httpClientService.addVendor(this.newVendor.value)
      .subscribe(data => {
        this.newVendor.reset();
        this.loadVendors();
      })
  }
}
