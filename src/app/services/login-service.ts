import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = false;
  private baseUrl = 'http://localhost:5000/api'; // Node.js backend base URL

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.success) {
          this.loggedIn = true;
          localStorage.setItem('token', res.token); // store JWT token
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn || !!localStorage.getItem('token');
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }
}
