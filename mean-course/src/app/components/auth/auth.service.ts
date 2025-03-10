import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface AuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token!: string;
  private userAuthenticationStatus = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.userAuthenticationStatus.asObservable();
  }

  signUp(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.httpClient
      .post('http://localhost:3000/api/users/signup', authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    this.httpClient
      .post<{ token: string }>('http://localhost:3000/api/users/login', {
        email: email,
        password: password,
      })
      .subscribe((response: { token: string }) => {
        this.token = response.token;
        console.log('test')
        console.log(response);
        this.userAuthenticationStatus.next(true);
      });
  }
}
