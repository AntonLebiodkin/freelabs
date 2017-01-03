import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Subjects } from '../../shared/subjects'
import {LabService} from "../../services/lab.service";
import {Lab} from "../../models/lab";
import {AlertService} from "../../services/alert.service";

declare var $: any;

@Component({
  selector: 'lab-search-form',
  templateUrl: './lab-search-form.component.html',
  styleUrls: ['./lab-search-form.component.css']
})
export class LabSearchFormComponent implements OnInit {
  labs: Lab[];
  @Output() labsUpdated = new EventEmitter();

  subjects: string[] = Subjects;
  subjectsMap: any = {
    'Чисельні методи': false,
    'Бази даних': false,
    'Математичний аналіз': false,
    'Комп\'ютерна логіка': false,
    'Історія української культури': false,
    'Моделювання ПЗ': false,
    'Лінійна алгебра': false,
    'Математична статистика': false,
    'Архітектура комп\'ютера': false,
    'Об\'єктно-орієнтоване програмування': false,
    'Основи програмування': false,
    'Історія України': false,
    'Фізика': false
  };
  checkedSubjects: number[] = [];

  constructor(private labService: LabService, private alertService: AlertService) {}

  emitLabs() {
    this.labsUpdated.emit(this.labs);
  }

  updateCheckedSubjects(subject, event) {
    this.subjectsMap[subject] = event.target.checked;
  }

  submitCheckedSubjects() {
    for(var s in this.subjectsMap) {
      if(this.subjectsMap[s]) {
        this.checkedSubjects.push(this.subjects.indexOf(s));
      }
    }
  }

  resetCheckedSubjects() {
    for(var s in this.subjectsMap) {
      this.subjectsMap[s] = false;
    }
  }

  onSubmit() {
    this.submitCheckedSubjects();
    this.getLabsForSubject(this.checkedSubjects.sort());
  }

  hasChecked() {
    for(var s in this.subjectsMap) {
      if (this.subjectsMap[s]) return true
    }
    return false;
  }

  cancel() {
    this.resetCheckedSubjects();
    this.labService.getLabsOnPage(1)
                   .subscribe(
                      data => { this.labs = data as Lab[]; this.emitLabs(); this.checkedSubjects = []; console.log(data); },
                      error => this.alertService.error(error)
                   )
  }

  getLabsForSubject(subjects: number[]) {
    if (!subjects.length) return this.resetCheckedSubjects();
    this.labService.getLabsForSubjects(this.checkedSubjects.sort())
                   .subscribe(
                      data => { console.log(data); this.labs = data as Lab[]; this.emitLabs(); this.checkedSubjects = []; },
                      error => this.alertService.error(error)
                   )
  }

  ngOnInit() {
  }

}
