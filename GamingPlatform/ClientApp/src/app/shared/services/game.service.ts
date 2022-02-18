import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Response} from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) {
  }

  url = environment.gameAPI;

  getGames(): Observable<any> {
    return this.http.get<Response>(this.url + 'get')
      .pipe(map(
        res => {
          return res.result;
        }
      ));
  }
  getOneGame(nameUrl: string): Observable<any> {
    return this.http.get<Response>(this.url + 'get/' + nameUrl);
  }
}
