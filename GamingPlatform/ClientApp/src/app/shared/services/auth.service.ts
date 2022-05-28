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
    const id = this.cookies.get('UserId')

    return {id: id, id32: AuthService.steamID64toSteamID32(id), username: this.cookies.get('Username'), avatar: this.cookies.get('Avatar')}
  }

  static steamID64toSteamID32 (steamID64: string) {
    return Number(steamID64.substr(-16,16)) - 6561197960265728
  }
}
