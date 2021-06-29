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
    const expDate = localStorage.getItem('fb-token-exp');
    if(new Date() > new Date(expDate)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token')
  }

  private setToken(response: fbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    )
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
