import {Component, HostBinding, TemplateRef} from '@angular/core';
import {ToastService, Toast} from "../../services/toast/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @HostBinding('class') get class() {
    return 'toast-container position-fixed top-0 end-0 p-3';
  }

  constructor(private toastService: ToastService) {
  }

  get toasts(): Toast[] {
    return this.toastService.toasts;
  }

  removeToast(toast: Toast) {
    this.toastService.remove(toast);
  }

  isTemplate(toast: Toast) {
    return toast.textOrTemplate instanceof TemplateRef;
  }
}
