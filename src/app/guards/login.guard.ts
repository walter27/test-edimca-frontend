import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private route: Router
  ) { }

  canActivate() {
    if (this.loginService.isLoging()) {
      return true;
    } else {
      this.route.navigate(['/login/session'])
      return false;

    }
  }

}
