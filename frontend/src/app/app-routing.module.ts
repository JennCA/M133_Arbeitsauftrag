import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { BasketComponent } from './components/basket/basket.component';


const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'product_details', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'basket', component: BasketComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
