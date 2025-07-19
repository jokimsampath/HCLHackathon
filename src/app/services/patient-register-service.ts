import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientRegisterService {
  private baseUrl = 'http://localhost:5000/api'; // Node.js backend base URL

  constructor(private http: HttpClient) { }

  registerPatient(registerData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.baseUrl}/register`, registerData).pipe(
      tap((res: any) => {
        if (res.success) {
          return res;
        }
      })
    );
  }
}


