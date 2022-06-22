import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../iterface/iterfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlWebService: string = environment.urlWebService


  constructor(
    private http: HttpClient
  ) { }

  listClient() {
    let url = `${this.urlWebService}/client/list`;
    return this.http.get<Client[]>(url).pipe(catchError(this.errorHandler));
  }

  addClient(client: Client) {
    let url = `${this.urlWebService}/client/add`;
    return this.http.post(url, client).pipe(catchError(this.errorHandler));
  }

  deleteClient(id: number) {
    let url = `${this.urlWebService}/client/delete/${id}`;
    return this.http.delete(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
