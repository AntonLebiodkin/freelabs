import {Component, OnInit, OnDestroy} from '@angular/core';
import { LabItemComponent } from '../lab-item/lab-item.component';
import { LabSearchFormComponent } from '../lab-search-form/lab-search-form.component';
import { Lab } from "../../models/lab";
import { LabService } from "../../services/lab.service";
import { AlertService } from "../../services/alert.service";
import { Observable, Subscription } from 'rxjs';
import { Input } from "@angular/core/src/metadata/directives";
import {Router, ActivatedRoute, Params} from "@angular/router";

declare var res;

@Component({
  selector: 'view-labs',
  templateUrl: './view-labs.component.html',
  styleUrls: ['./view-labs.component.css']
})
export class ViewLabsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  labs: Lab[];
  p: number = 1;
  total: number = 1;
  subscription: Subscription;

  constructor(
    private labService: LabService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.subscription = this.route.params
                                  .subscribe((params: Params) => {
                                      this.p = +params['page'];
                                      this.defaultSearch(this.p);
                                      window.scrollTo(0,0);
                                  });
  }

  ngOnDestroy() {
     this.subscription.unsubscribe();
  }

  defaultSearch(page: any) {
    if (!page) page = 1;
    this.router.navigate(['/viewlabs', page]);
    this.labService.getLabsOnPage(page)
                   .do(res => {
                       let results: any = res;
                       this.total = results.total;
                       this.p = page;
                       this.loading = false;
                    })
                   .subscribe(res => {
                       let results: any = res;
                       this.labs = results.docs;
                     },
                     err => this.alertService.error(err)
                   );
  }

  labsUpdate(labs: Lab[]) {
    if (!labs) {
      return this.defaultSearch(1);
    }
    this.labs = labs;
    this.total = labs.length;

  }
}
