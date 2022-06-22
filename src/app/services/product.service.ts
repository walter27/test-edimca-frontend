import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Product } from '../iterface/iterfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlWebService: string = environment.urlWebService


  constructor(
    private http: HttpClient
  ) { }

  listProduct() {
    let url = `${this.urlWebService}/product/list`;
    return this.http.get<Product[]>(url).pipe(catchError(this.errorHandler));
  }

  addProduct(product: Product) {
    let url = `${this.urlWebService}/product/add`;
    return this.http.post(url, product).pipe(catchError(this.errorHandler));
  }

  deleteProduct(id: number) {
    let url = `${this.urlWebService}/product/delete/${id}`;
    return this.http.delete(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
