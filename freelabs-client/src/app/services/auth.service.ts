import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";


@Injectable()
export class AuthService {
  CLIENTID: string = 'a823jkas87y3kjakjhsd';
  CLIENTSECRET: string = 'dksu287aokjfaouiusdia7127a5skd';
  private loginUrl = 'http://localhost:3000/api/auth/token';

  constructor(private http: Http) { }

  login(username: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = {
      client_id: this.CLIENTID,
      client_secret: this.CLIENTSECRET,
      grant_type: 'password',
      username: username,
      password: password
    };
    return this.http.post(this.loginUrl, body, { headers })
                    .map((response: Response) => {
                      let r = response.json();
                      if (r.error) {
                        throw new Error(r.error);
                      }
                      if (r.user) {
                        localStorage.setItem('currentUser', JSON.stringify(r.user));
                      } else {
                        throw new Error("Unexpected response. ");
                      }
                    });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): BehaviorSubject<boolean> {
    return new BehaviorSubject(localStorage.getItem('currentUser') !== null);
  }

}
