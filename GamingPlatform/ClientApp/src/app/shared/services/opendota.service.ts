import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {OpenDotaMatch} from "../interfaces/opendota.match";

@Injectable({
  providedIn: 'root'
})
export class OpenDotaService {

  baseUrl = 'https://api.opendota.com/api/'

  constructor(public http: HttpClient, public authService: AuthService) {
  }

  getMatches(limit: number = 50): Observable<OpenDotaMatch[]> {
    return this.http.get<OpenDotaMatch[]>(`${this.baseUrl}players/${this.authService.currentUser.id32}/matches`).pipe(map(x => {
      x.forEach((match: any) => {
        match.start_date = new Date(match.start_time * 1000)
      })

      return x
    }))
  }

  getHeroes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}players/${this.authService.currentUser.id32}/heroes`)
  }
}
