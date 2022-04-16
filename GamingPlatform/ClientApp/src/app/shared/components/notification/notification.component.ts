import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NotificationService} from "../../services/notification.service";
import {NotificationType} from "../../types/notification.type";
import {Notification} from "../../interfaces/notification";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[] = [];
  private _subscription: Subscription | undefined;

  constructor(private _notificationSvc: NotificationService) { }

  private _addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }

  ngOnInit() {
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  close(notification: Notification) {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
  }


  getClassName(notification: Notification): string {

    switch (notification.type) {

      case NotificationType.Success:
        return  'alert-success'

      case NotificationType.Warning:
        return  'alert-warning';

      case NotificationType.Error:
        return  'alert-danger';

      default:
        return 'alert-primary';
    }
  }

  getIconClass(notification: Notification): string {

    switch (notification.type) {

      case NotificationType.Success:
        return  'far fa-check-circle faa-tada'

      case NotificationType.Warning:
        return  'fa fa-exclamation-triangle faa-flash';

      case NotificationType.Error:
        return  'far fa-times-circle faa-pulse';

      default:
        return 'fa fa-thumbs-up faa-bounce';
    }
  }

  getCrossIconClass(notification: Notification): string {

    switch (notification.type) {

      case NotificationType.Success:
        return  'greencross'

      case NotificationType.Warning:
        return  'warning';

      case NotificationType.Error:
        return  'danger';

      default:
        return 'alertprimary';
    }
  }
}
