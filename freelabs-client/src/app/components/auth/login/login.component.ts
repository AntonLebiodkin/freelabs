import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { AlertService } from "../../../services/alert.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading =  false;
  error = '';

  constructor(
      private router: Router,
      private authService: AuthService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
              this.router.navigate(['/profile']);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }
}