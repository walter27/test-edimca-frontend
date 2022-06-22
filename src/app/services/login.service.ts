import { Injectable } from '@angular/core';
import { UserEdimca, Login } from '../iterface/iterfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlWebService: string = environment.urlWebService
  token!: string;

  constructor(
    private http: HttpClient,
  ) { }

  login(userEdimca: UserEdimca) {
    let url = `${this.urlWebService}/api/login`;
    return this.http.post<Login>(url, userEdimca, { params: { skip: 'yes' } })
      .pipe(map((resp: Login) => {
        this.token = resp.token;
        return true;
      }),
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
  isLoging() {
    return (this.token != null && this.token.length > 0) ? true : false;
  }
}
