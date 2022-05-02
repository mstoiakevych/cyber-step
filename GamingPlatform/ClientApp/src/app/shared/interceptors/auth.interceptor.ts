import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.authService.login('/')
        }

        return throwError(err);
      })
    )
  }
}
