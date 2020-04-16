import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { CartItemCountService } from 'src/app/service/cart-item-count.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false


  constructor(private httpClientService: HttpClientService, private cartItemService: CartItemCountService, private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {

    if (localStorage.getItem("username"))
      this.router.navigate(['/home']);
  }

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        //console.log(JSON.stringify(data));
        this.router.navigate(['/home'])
        this.invalidLogin = false

        this.httpClientService.showCart().subscribe(
          res => {
            let count = 0;
            this.cartItemService.clearCounter();
            if (res.body.productsInCart) {
              for (let product of res.body.productsInCart) {
                count += product.quantity;
              }
            }

            this.cartItemService.emitValue(count)


          }
        );



        // localStorage.setItem('token', 'Bearer ' + data.token);

      },
      error => {
        //this.router.navigate(['/errorpage'])
        this.invalidLogin = true
        console.clear();

      }
    )


  }

}
/*this.userService.register(this.registerForm.value)
        .pipe(map((res: Response) => res.json()))
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            (error:HttpErrorResponse) => {
                let errorPayload = JSON.parse(error.message);
                //ToDo: apply your handling logic e.g.:
                //console.log(errorPayload[0].description
                console.log(error.error);
            }); */