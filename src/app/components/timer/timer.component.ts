import {Component, Input, OnInit, Output} from '@angular/core';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  private interval?: Timeout;

  @Input() timeLeft: number = 60;
  @Input() className: string = "";

  @Output() startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000)
  }
}
