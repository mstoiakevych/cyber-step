import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreatedMatch, CreateMatch, Match} from "../interfaces/match";
import {Observable} from "rxjs";
import {IApiService} from "../interfaces/iapi.service";

@Injectable({
  providedIn: 'root'
})
export class MatchService implements IApiService {

  constructor(private http: HttpClient) {
  }

  baseUrl = '/api/match'

  createAndJoinMatch(match: CreateMatch): Observable<CreatedMatch> {
    return this.http.post<CreatedMatch>(`${this.baseUrl}/create-join`, match)
  }

  joinMatch(matchId: number) : Observable<CreatedMatch> {
    return this.http.post<CreatedMatch>(`${this.baseUrl}/join/${matchId}`, null);
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl);
  }
}
