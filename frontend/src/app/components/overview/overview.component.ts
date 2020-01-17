import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public products: Array<Product> = new Array<Product>();

  constructor(private router: Router, private productService: ProductService) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  showDetails(food: any) {
    this.router.navigateByUrl('product_details', {state: {data: {foodProduct: food}}});
  }
}
