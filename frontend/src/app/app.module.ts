import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductService } from './services/product.service';
import { HttpInterceptorService } from './services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CheckoutComponent,
    BasketComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, 
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
