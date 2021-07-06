import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Post } from "../intefaces";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbRtDataBase}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        })
      )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbRtDataBase}/posts.json`).pipe(
      map((response: {[key: string]: any}) => {
        return Object.keys(response)
        .map((key) => {
          return {
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }
        })
      })
    )
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbRtDataBase}/posts/${id}.json`)
    .pipe(
      map((post: Post) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      })
    )
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbRtDataBase}/posts/${id}.json`);
  }
}
