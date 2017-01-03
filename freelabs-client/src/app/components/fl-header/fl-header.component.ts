import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subject, BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'fl-header',
  templateUrl: './fl-header.component.html',
  styleUrls: ['./fl-header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLoggedIn: Subject<boolean> = new BehaviorSubject(false);
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
