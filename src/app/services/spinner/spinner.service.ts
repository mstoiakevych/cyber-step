import {Injectable} from '@angular/core';

export interface Spinner {
  withBackGround?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public visible: boolean = false;
  public withBackGround: boolean = false;

  show(options: Spinner = {}) {
    this.visible = true;
    this.withBackGround = options.withBackGround!;
  }

  hide() {
    this.visible = false;
  }
}
