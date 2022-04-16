import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public cookies: CookieService) {
  }

  login(returnUrl: string): void {
    window.location.href = `/signin?RedirectUrl=${returnUrl}`
  }

  logout(): void {
    window.location.href = '/signout'
  }

  isAuthenticated(): boolean {
    return this.cookies.check('UserId') && this.cookies.check('Username') && this.cookies.check('Avatar');
  }

  get currentUser(): User {
    return {id: this.cookies.get('UserId'), username: this.cookies.get('Username'), avatar: this.cookies.get('Avatar')}
  }
}
