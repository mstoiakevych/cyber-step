import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../interfaces/response';
import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) {
  }

  url = environment.blogAPI;

  getBlogs(): Observable<any> {
    return this.http.get<Response>(this.url + 'get')
      .pipe(map(
        res => {
          return res.result;
        }
      ));
  }

  getOneBlog(id: string): Observable<any> {
    return this.http.get<Response>(this.url + 'get/' + id)
      .pipe(map(
        res => {
          return res.result;
        }
      ));
  }

  createBlog(blog: Blog): Observable<any> { // blog: { imgUrl: string; text: string; title: string } - was in parameters
    return this.http.post(this.url + 'create', blog);
  }

  updateBlog(blog: Blog): Observable<any> {
    return this.http.put(this.url + 'update', blog);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete(this.url + 'delete' + '/' + id);
  }
}
