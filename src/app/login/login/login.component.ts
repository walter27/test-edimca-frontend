import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEdimca } from '../../iterface/iterfaces';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  userEdimca: UserEdimca = {
    username: '',
    password: ''
  };
  showMessage: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  login(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    this.userEdimca = {
      username: `${forma.form.value.username}`,
      password: `${forma.form.value.password}`
    }

    this.loginService.login(this.userEdimca).subscribe(
      {
        next: (resp: any) => {
          this.router.navigate(['/admin/product'])
        },
        error: () => {
          this.showMessage = true;
          forma.reset();
        }
      }
    );
  }
}
