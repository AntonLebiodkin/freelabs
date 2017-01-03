import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserProfile} from "../models/userprofile";

@Injectable()
export class ProfileService {
  private authToken: string;
  CLIENTID: string = 'a823jkas87y3kjakjhsd';
  CLIENTSECRET: string = 'dksu287aokjfaouiusdia7127a5skd';

  private profileUrl = 'http://localhost:3000/api/profile/';
  private myID: string;

  constructor(private http: Http) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authToken = currentUser.token;
    this.myID = currentUser.id;
  }

  getProfile(id: string) {
    if (!id) {
        id = this.myID
    }
    let headers = new Headers({ 'authorization': 'Bearer ' + this.authToken });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let fullUrl = this.profileUrl + id;
    return this.http.get(fullUrl, options)
      .map((response: Response) => {
        let res = response.json();
        if (res.error) {
          throw new Error(res.error);
        }
        if (res.profile) {
          return res.profile;
        } else {
          throw new Error('Unexpected server respone');
        }
      });
  }
}