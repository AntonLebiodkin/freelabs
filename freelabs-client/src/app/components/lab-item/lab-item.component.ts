import {Component, OnInit, Input, ElementRef} from '@angular/core';
import { Lab } from "../../models/lab";
import {Router} from "@angular/router";
import {HostListener} from "@angular/core/src/metadata/directives";
import {LabService} from "../../services/lab.service";

@Component({
  selector: 'lab-item',
  templateUrl: './lab-item.component.html',
  styleUrls: ['./lab-item.component.css']
})
export class LabItemComponent{
  @Input() lab: Lab;
  constructor(private router: Router, private el: ElementRef, private labService: LabService) { }

  onViewLabItem(id: string) {
    this.router.navigate(['/lab', id]);
  }
}
