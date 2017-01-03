import {Component, OnInit, ElementRef} from '@angular/core';
import { Lab } from "../../models/lab";
import { LabService } from "../../services/lab.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import { Subjects } from '../../shared/subjects'

declare var $: any;

@Component({
  selector: 'create-lab',
  templateUrl: './create-lab.component.html',
  styleUrls: ['./create-lab.component.css']
})
export class CreateLabComponent implements OnInit {
  currentDate: any = {};
  dropdownError: string = '';
  lab: Lab = new Lab();
  subjects: string[] = Subjects;
  myDatePickerOptions: any = {
    disableUntil: this.currentDate,
    inputValueRequired: true
  };
  constructor(
    private labService: LabService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    var date = new Date();
    this.currentDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    $('.ui.dropdown').dropdown();
  }

  submit(form: NgForm) {
    let subject = $('.ui.dropdown').dropdown('get text');
    console.log(subject);
    if (subject) {
      this.lab.subject = this.subjects.indexOf(subject);
      this.postLab();
    } else {
      this.dropdownError = 'Будь ласка, оберіть предмет';
    }
  }
  postLab() {
    this.labService.postLab(this.lab)
                   .subscribe(
                      data => {
                        this.alertService.success('Лаба була успішно створена');
                        this.router.navigate(['profile']);
                    },
                      error => {
                        this.alertService.error(error);
                    });
  }



  onDateChanged(event:any) {
    this.lab.endDate = new Date(event.jsdate);
  }
}
