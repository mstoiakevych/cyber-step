import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateMatch, Match} from "../interfaces/match";
import {Observable} from "rxjs";
import {IApiService} from "../interfaces/iapi.service";
import {Player} from "../interfaces/player";

@Injectable({
  providedIn: 'root'
})
export class MatchService implements IApiService {

  constructor(private http: HttpClient) {
  }

  baseUrl = '/api/match'

  create(match: CreateMatch): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/create`, match)
  }

  join(matchId: number) : Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/join/${matchId}`, null);
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl);
  }

  getMatch(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/${id}`)
  }
}
