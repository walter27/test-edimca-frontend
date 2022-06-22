import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const skip = req.params.get('skip');
    if (skip === 'yes') {
      const skip = req.params.delete('skip');
      const reqClone = req.clone({ params: skip });
      return next.handle(reqClone).pipe(
        catchError(this.errorHandler)
      );
    } else {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.loginService.token}` });
      const reqClone = req.clone({ headers });
      return next.handle(reqClone).pipe(
        catchError(this.errorHandler)
      )
    }
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}
