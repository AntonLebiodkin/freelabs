import { Injectable } from '@angular/core';
import { Response, Http } from "@angular/http";
import { UserProfile } from "../models/userprofile";
import { Observable } from "rxjs";

@Injectable()
export class SignupService {
  private signupUrl: string = 'http://localhost:3000/api/signup';
  constructor (
    private http: Http
  ) { }

  register(userProfile: UserProfile) {
    return this.http.post(this.signupUrl, JSON.stringify(userProfile))
                    .map((response: Response) => true)
                    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
