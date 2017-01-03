import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { Lab } from "../../models/lab";

@Component({
  selector: 'view-lab-item',
  templateUrl: './view-lab-item.component.html',
  styleUrls: ['./view-lab-item.component.css']
})
export class ViewLabItemComponent implements OnInit {
  @Input() lab: Lab;
  constructor() { }

  ngOnInit() {
  }

}
