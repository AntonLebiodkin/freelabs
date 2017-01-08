import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Lab } from "../models/lab";
import {AlertService} from "./alert.service";

@Injectable()
export class LabService {
  private authToken: string;

  CLIENTID: string = 'a823jkas87y3kjakjhsd';
  CLIENTSECRET: string = 'dksu287aokjfaouiusdia7127a5skd';
  private labUrl = 'http://localhost:3000/api/labs';
  private labForSubjectsUrl = 'http://localhost:3000/api/labs/for-subjects';
  private labSelected: Lab;

  constructor(private http: Http, private alertService: AlertService) {
    this.authToken = JSON.parse(localStorage.getItem('currentUser')).token;
  }

  getLabById(id: string) {
    const labUrl = 'http://localhost:3000/api/lab/' + id;
    return this.http.get(labUrl)
                    .map( (response: Response) => response.json() as Lab)
  }

  postLab(lab: Lab) {
    let headers = new Headers({ 'authorization': 'Bearer ' + this.authToken });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let body = {
      lab: lab
    };
    return this.http.post(this.labUrl, body, options)
      .map((response: Response) => {
        let res = response.json();
        if (res.error) {
          throw new Error(res.error);
        }
        if (res.success) {
          return res;
        }
      });
  }

  getLabsOnPage(page: number) {
    page = page || 1;
    let params = new URLSearchParams();
    params.set('page', page.toString());
    let headers = new Headers({ 'authorization': 'Bearer ' + this.authToken });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true, search: params });
    return this.http.get(this.labUrl, options)
                    .map(res => res.json() as any)
                    .catch(err => err);
  }

  getLabsForSubjects(subjects: number[]) {
    let params = new URLSearchParams();
    params.set('subjects', subjects.toString());
    let headers = new Headers({ 'authorization': 'Bearer ' + this.authToken });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true, search: params });
    return this.http.get(this.labForSubjectsUrl, options)
                    .map( res =>  res.json() as any)
                    .catch(err => err);
  }

  getLabForUser(){

  }

  getLabsCount() {

  }



}
