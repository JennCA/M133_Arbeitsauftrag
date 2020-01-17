import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { BasketItem } from 'src/app/entities/basketItem';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  private allProducts: Array<Product> = [];
  private shoppingBasket: Array<Product> = [];
  private itemsInBasket: Array<BasketItem> = [];
  public products: Array<Product> = new Array<Product>();
  private total: number;

  constructor(private productService: ProductService, private router: Router) { }

  async ngOnInit() {
    await this.loadBasket();
  }

  private async loadBasket() {
    await this.productService.getProducts().then(async (allProducts) => {
      this.allProducts = allProducts;
      await this.productService.getBasket().then(async (products) => {
        this.shoppingBasket = products;
        this.distinctProducts();
        this.deleteItemFromBasket(this.itemsInBasket);
        this.total = this.count('total');
      });
    });
  }

  private count(key: string) {
    return this.itemsInBasket.reduce((a, b) => a + (b[key] || 0), 0);
  }

  async addToBasket(product: Product) {
    await this.productService.addProductToBasket(product);
    this.itemsInBasket = [];
    await this.loadBasket();
  }

  async removeFromBasket(product: Product) {
    await this.productService.removeProductFromBasket(product);
    this.itemsInBasket = [];
    await this.loadBasket();
  }

  private distinctProducts() {
    let currentProductName = '';
    for (let product of this.allProducts) {
      currentProductName = product.name;
      let count = 0;
      for (let productBasket of this.shoppingBasket) {
        if (product.name === productBasket.name) {
          count++;
        }
      }
      const basketItem = {
        product: product,
        quantity: count,
        total: product.offer * count
      };
      this.itemsInBasket.push(basketItem);
    }
  }

  private deleteItemFromBasket(productList: Array<BasketItem>) {
    let count = 0;
    for (let product of this.itemsInBasket) {
      if (product.quantity === 0) {
        this.itemsInBasket.splice(count, 1);
        this.deleteItemFromBasket(this.itemsInBasket);
      }
      count++;
    }
  }
}
