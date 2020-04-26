import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MyorderhistoryComponent } from './components/myorderhistory/myorderhistory.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AddproductGuardService } from './service/addproduct-guard.service';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AuthGaurdService } from './service/auth-guard.service';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './components/home/home.component';
import { OrderplaceComponent } from './components/orderplace/orderplace.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search/:searchWord', component: SearchComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: AdduserComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGaurdService] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGaurdService] },
  { path: 'order-history', component: MyorderhistoryComponent, canActivate: [AuthGaurdService] },
  { path: 'productdetails/:productId', component: ProductdetailsComponent },
  { path: 'order-placed', component: OrderplaceComponent },
  {
    path: 'addproduct', component: AddproductComponent, canActivate: [AuthGaurdService, AddproductGuardService]
  },
  {
    path: 'user-profile', component: UserprofileComponent, canActivate: [AuthGaurdService]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
