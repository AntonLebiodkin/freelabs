import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { Lab } from "../../models/lab";
import {LabService} from "../../services/lab.service";
import {Location} from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import {Params, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'view-lab-item',
  templateUrl: './view-lab-item.component.html',
  styleUrls: ['./view-lab-item.component.css']
})
export class ViewLabItemComponent implements OnInit {
  labId: string;
  lab: Lab;
  subscription: Subscription;
  constructor(private labService: LabService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params
                            .subscribe((params: Params) => {
                              this.labId = params['id'];
                              this.getLab(this.labId);
                            });
  }

  onLocationBack() {
    this.location.back();
  }

  getLab(id: string) {
    return this.labService.getLabById(id)
                          .subscribe(
                            data => this.lab = data
                          );
  }

}
