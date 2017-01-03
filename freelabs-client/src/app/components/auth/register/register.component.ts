import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SignupService } from "../../../services/signup.service";
import { AlertService } from "../../../services/alert.service";
import {Router } from "@angular/router";
import {UserProfile} from "../../../models/userprofile";

declare var $: any;

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  model: UserProfile = new UserProfile();
  loading =  false;
  constructor(
      private signupService: SignupService,
      private router: Router,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    $('.ui.dropdown').dropdown();
  }

  register(form: NgForm) {
    this.loading = true;
    this.signupService.register(this.model)
        .subscribe(
            data => {
              this.router.navigate(['/']);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }
}