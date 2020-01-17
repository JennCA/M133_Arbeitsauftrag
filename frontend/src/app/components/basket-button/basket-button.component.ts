import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-basket-button',
  templateUrl: './basket-button.component.html',
  styleUrls: ['./basket-button.component.css']
})
export class BasketButtonComponent implements OnInit {

  private basketBtn: Array<Product>;
  public total;

  constructor(private productService: ProductService) { }

  async ngOnInit() {
    this.productService.basketState$.subscribe(async () => {
      await this.updateBasketButton();
    });
    await this.updateBasketButton();
  }

  private priceTotal() {
    let total = 0.00;
    for (const product of this.basketBtn) {
      total += product.offer;
    }
    this.total = total;
  }

  private async updateBasketButton() {
    this.basketBtn = await this.productService.getBasket();
    this.priceTotal();
  }

}
