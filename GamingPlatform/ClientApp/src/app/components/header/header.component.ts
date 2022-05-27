import {Component} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {faSignOut, faGem} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Icons
  faSignOut = faSignOut
  faGem = faGem

  public isMenuCollapsed = true;

  constructor(public authService: AuthService, public router: Router) {
  }

  handleLogin() {
    if (this.authService.isAuthenticated()) {

    } else {
      this.authService.login('')
    }
  }
}
