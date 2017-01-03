import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subject' })
export class SubjectPipe implements PipeTransform {
   subjectMap = {
     '0':'Чисельні методи',
     '1':'Бази даних',
     '2':'Математичний аналіз',
     '3':'Комп\'ютерна логіка',
     '4':'Історія української культури',
     '5':'Моделювання ПЗ',
     '6':'Лінійна алгебра',
     '7':'Математична статистика',
     '8':'Архітектура комп\'ютера',
     '9':'Об\'єктно-орієнтоване програмування',
     '10':'Основи програмування',
     '11':'Історія України',
     '12':'Фізика',
  };
  transform(value: any, args?: any): any {
    if (this.subjectMap[value]) return this.subjectMap[value];
    return value;
  }

}
