import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NotificationType} from "../types/notification.type";
import {Notification} from "../interfaces/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _subject = new Subject<Notification>();
  private _idx = 0;

  constructor() { }

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Info, title, message, timeout));
  }

  success(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Success, title, message, timeout));
  }

  warning(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Warning, title, message, timeout));
  }

  error(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.Error, title, message, timeout));
  }
}
