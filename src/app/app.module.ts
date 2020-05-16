import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyorderhistoryComponent } from './components/myorderhistory/myorderhistory.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductinfoComponent } from './components/productinfo/productinfo.component';
import { FillPipe } from './pipe/fill.pipe';
import { DateAgoPipe } from './pipe/date-ago.pipe';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor.service';
import { ErrorInterceptorService } from './service/error-interceptor.service';
import { TruncatePipe } from './pipe/truncate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import {
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider

} from 'angular-6-social-login';
import { OrderplaceComponent } from './components/orderplace/orderplace.component';


export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('876148984713-kkvlj74boqcpg6p5apo0thuspfjbf8fu.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AddproductComponent,
    AdduserComponent,
    CartComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MyorderhistoryComponent,
    ProductsComponent,
    ProductdetailsComponent,
    UserprofileComponent,
    WishlistComponent,
    ProductinfoComponent,
    FillPipe,
    DateAgoPipe,
    TruncatePipe,
    SearchComponent,
    OrderplaceComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxPaginationModule, SocialLoginModule, BrowserAnimationsModule,
    ToastrModule.forRoot()


  ],
  entryComponents: [

    UserprofileComponent
  ],

  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, {
    provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
