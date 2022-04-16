import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

}
