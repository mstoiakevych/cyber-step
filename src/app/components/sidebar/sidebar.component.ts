import {Component, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate('{{ timing }}', style({opacity: 1}))
      ], {params: {timing: '300ms'}}),
      transition(':leave', [   // :leave is alias to '* => void'
        animate('{{ timing }}', style({opacity: 0}))
      ], {params: {timing: '300ms'}}),
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Input() zIndex: number = 100;
  @Input() transition: string = 'ease-in-out 300ms';
  @Input() background: string = '#ffffff';
  @Input() toggleBackground: string = 'rgba(36, 36, 36, 0.5)';
  @Input() width: string = '400px';
  @Input() toggle: boolean = true;

  private _time: string = '300ms';
  private _timing: number = 300;

  get time(): string {
    return this._time;
  }

  @Input() set timing(value: number) {
    this._time = value + "ms";
  }

  @Output() show(): void {
    this._sidebarShow = true;
  }

  @Output() hide(): void {
    this._sidebarShow = false;
  }

  get sidebarShow(): boolean {
    return this._sidebarShow;
  }

  private _sidebarShow: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
