import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../iterface/iterfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  urlWebService: string = environment.urlWebService

  constructor(
    private http: HttpClient,

  ) { }

  addOrder(order: Order) {
    let url = `${this.urlWebService}/order/add`;
    return this.http.post(url, order).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
