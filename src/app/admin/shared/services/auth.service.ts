import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { fbAuthResponse, User } from "src/app/shared/intefaces";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  get token(): string {
    return ''
  }

  private setToken(response: fbAuthResponse) {
    console.log(response);
  }

  login(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    )
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
