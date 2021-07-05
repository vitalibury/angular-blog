import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { fbAuthResponse, User } from "src/app/shared/intefaces";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorSubject: Subject<string> = new Subject<string>();
  error$ = this.errorSubject.asObservable();

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
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    )
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    console.log(message);
    switch(message) {
      case "INVALID_PASSWORD":
        this.errorSubject.next('Неверный пароль');
        break
      case "EMAIL_NOT_FOUND":
        this.errorSubject.next('Такого email не существует');
        break
    }
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
