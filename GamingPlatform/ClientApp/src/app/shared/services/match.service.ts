import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreatedMatch, Match} from "../interfaces/match";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) {
  }

  createMatch(match: Match): Observable<CreatedMatch> {
    return this.http.post<CreatedMatch>('/api/match/create-join', match)
  }
}
