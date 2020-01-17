import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private food: Product = {id: '', name: 'undefined', image: '', offer: 0.00, price: 0.00, description: ''};

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    try {
      this.food = history.state.data.foodProduct;
    } catch (e) {
      this.router.navigateByUrl('overview');
    }
  }

  public async addToBasket() {
    await this.productService.addProductToBasket(this.food);
  }

}
