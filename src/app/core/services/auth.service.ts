import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IAuth, IRegister, IToken} from "../interfaces";
import {URL} from '../../shared/config/'
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';

  constructor(private httpClient: HttpClient) { }

  login(user: IAuth): Observable<IToken> {
    return this.httpClient.post<IToken>('http://localhost:8000/api/v1/auth_', user)
      .pipe(
        tap((tokens: IToken) => this.setTokens(tokens))
      )
  }

  register(user: IRegister): Observable<void> {
    return this.httpClient.post<void>('http://localhost:8000/api/v1/auth_/register', user)
  }

  refreshToken(): Observable<IToken> {
    return this.httpClient.post<IToken>(URL.refreshTokenURL, {refresh: this.getRefrashToken()})
      .pipe(
        tap((tokens: IToken) => this.setTokens(tokens))
      )
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string;

  }

  private setAccessTocken(access: string): void {
    localStorage.setItem(this.accessTokenKey, access)
  }

  private getRefrashToken(): string {
    return localStorage.getItem(this.refreshTokenKey) as string;

  }

  private setRefreshToken(refresh: string): void {
    localStorage.setItem(this.refreshTokenKey, refresh)
  }

  public deleteTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private setTokens(tokens: IToken): void {
    const {access, refresh} = tokens;
    this.setAccessTocken(access);
    this.setRefreshToken(refresh);
  }

}

