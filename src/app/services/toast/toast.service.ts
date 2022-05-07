import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  autohide?: boolean;
  classname?: string;
  delay?: number;
  header?: any;
  textOrTemplate?: any;
  ariaLive?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  show(textOrTemplate: string | TemplateRef<any>, options: Toast = {}) {
    this.toasts.push({ textOrTemplate, delay: 5000, autohide: true, ...options });
  }
}
