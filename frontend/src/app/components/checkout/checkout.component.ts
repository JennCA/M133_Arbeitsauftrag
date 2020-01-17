import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public fname = '';
  public lname = '';
  public email = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  public orderConfirmation() {
    if (this.validInput()) {
      alert('Danke für den Einkauf!');
      this.productService.emptyBasket();
    }
  }

  private validInput(): boolean {
    if (this.fname !== '' && this.lname !== '' && this.email !== '') {
      return true;
    }
    return false;
  }
}
