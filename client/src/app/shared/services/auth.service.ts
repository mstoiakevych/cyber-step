import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {map, tap} from 'rxjs/operators';
import {Response} from '../interfaces/response';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  get token(): string | null {
    return localStorage.getItem(environment.jwtToken);
  }

  private setToken(response: Response | null): void {
    if (response && response.result.token != null) {
      localStorage.setItem(environment.jwtToken, response.result.token);
    } else {
      localStorage.removeItem(environment.jwtToken);
    }
  }

  login(user: User): Observable<any> {
    return this.http.post<Response>(environment.authAPI + 'login', {email: user.email, password: user.password})
      .pipe(
        tap(this.setToken)
      );
  }

  register(user: User): Observable<any> {
    return this.http.post<Response>(environment.authAPI + 'register', user);
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getCurrentUser(): Observable<any> {
    const headers = {Authorization: `Bearer ${this.token}`};

    return this.http.get<Response>(environment.authAPI + 'getUserByToken', {headers})
      .pipe(map(
      res => {
        return res.result;
      }
    ));
  }

  updateUser(body: any): Observable<any> {
    return this.http.put<Response>(environment.authAPI + 'update', body);
  }
}
