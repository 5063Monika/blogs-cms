import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class AuthService {
  api = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}
  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }
  login(data: any) {
    return this.http.post(`${this.api}/login`, data);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.clear();
  }
}
