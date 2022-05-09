import {Component, OnInit} from '@angular/core';
import {ActivationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isHeader: boolean = false;
  isFooter: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(data => {
      if (data instanceof ActivationStart) {
        let snapshotData = data?.snapshot.data;
        this.isHeader = snapshotData['isHeader'];
        this.isFooter = snapshotData['isFooter'];
        const bodyElement = document.body;
        this.isFooter ? bodyElement.classList.add('body') : bodyElement.classList.remove('body')
      }
    });
  }
}
