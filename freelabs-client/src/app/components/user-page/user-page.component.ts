import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../../services/profile.service";
import { AlertService } from "../../services/alert.service";
import { UserProfile } from "../../models/userprofile";
import {Observable, BehaviorSubject} from "rxjs";
import {Subscription} from "rxjs";

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  private isDataAvailable: boolean = false;
  private profile: UserProfile;


  constructor(
      private profileService: ProfileService,
      private alertService: AlertService
  ) {  }

  ngOnInit() {
    this.getProfile(null);

  }

  getProfile(id: string) {
    return this.profileService.getProfile(null)
        .subscribe(
            profile => {console.log(profile); this.profile = profile},
            error => this.alertService.error(error)
        );
  }
}
