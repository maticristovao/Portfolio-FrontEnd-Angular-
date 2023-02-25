import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post(this.url + '/authenticate', { username: username, password: password }).subscribe((resp: any) => {
      this.router.navigate(['']);
      localStorage.setItem('auth_token', resp.token);
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  public get LogIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
