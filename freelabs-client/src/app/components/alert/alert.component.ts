import {Component, OnInit, ElementRef, ComponentRef} from '@angular/core';
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'alert-component',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => { this.message = message; });
  }

}
