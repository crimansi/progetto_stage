import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponse, LoginRequest, MessageResponse, SignUpRequest } from '../model/IUser';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private baseUrlSignUp = 'http://localhost:8080/auth/signUp';
  private baseUrlLogin = 'http://localhost:8080/auth/login';

  isLoggedIn = false;
  avatar = '';

  signUp(request: SignUpRequest): Observable<MessageResponse>{
    return this.http.post<MessageResponse>(this.baseUrlSignUp, request).pipe(
      catchError((error: HttpErrorResponse) => {
        throw Error(error.error);
      })
    );
  }

  login(request: LoginRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.baseUrlLogin, request).pipe(
      tap((data) => {
        this.isLoggedIn = true;
        this.avatar = data.firstName.toUpperCase().charAt(0) + data.lastName.toUpperCase().charAt(0);
      }),
      catchError((error: HttpErrorResponse) => {
        throw Error(error.message);
      })
    );
  }
}
