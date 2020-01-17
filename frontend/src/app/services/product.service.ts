import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../entities/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  public basketState$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  public async getProducts() {
    return await this.http.get<Array<Product>>('http://localhost:8080/api/products').toPromise();
  }

  public async getBasket() {
    return await this.http.get<Array<Product>>('http://localhost:8080/api/basket').toPromise();
  }

  public async addProductToBasket(product: Product) {
    await this.http.post('http://localhost:8080/api/basket', product, {responseType: 'text'}).toPromise();
    this.basketState$.next();
  }

  public async removeProductFromBasket(product: Product) {
    await this.http.post('http://localhost:8080/api/basket/remove-item', product, {responseType: 'text'}).toPromise();
    this.basketState$.next();
  }

  public async emptyBasket() {
    await this.http.post('http://localhost:8080/api/basket/empty', {}, {responseType: 'text'}).toPromise();
    this.basketState$.next();
  }
}
