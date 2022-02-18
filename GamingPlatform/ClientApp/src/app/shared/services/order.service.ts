import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Response} from '../interfaces/response';
import {Order} from '../interfaces/order';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  url = environment.orderAPI;

  getOrders(): Observable<any> {
    return this.http.get<Response>(this.url + 'get')
      .pipe(map(
        res => {
          return res.result;
        }
      ));
  }

  getOneOrder(id: string): Observable<any> {
    return this.http.get<Response>(this.url + 'get/' + id);
  }

  createOrder(order: Order): Observable<any> {
    const headers = {Authorization: `Bearer ${this.authService.token}`};

    return this.http.post(this.url + 'create', order, {headers});
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(this.url + 'delete/' + id);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.put(this.url + 'update', order);
  }


}
