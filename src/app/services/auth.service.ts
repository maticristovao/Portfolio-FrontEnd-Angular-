import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInfoService } from './personal-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private credentials!: Credential;
  private logged: boolean = false;

  constructor(private http: HttpClient, private router: Router, private personalDataService: PersonalInfoService) {
    this.personalDataService.getData('user/1').subscribe(user => {
      this.credentials = {
        username: user.username,
        password: user.password
      };
    })
  }

  login(username: string, password: string, remember: boolean): void {
    if (this.credentials.username === username && this.credentials.password === password) {
      this.router.navigate(['']);
      this.logged = true;
    } else {
      return;
    }
    if (remember) {
        localStorage.setItem('auth_user', this.credentials.username);
    }
  }

  logout(): void {
    localStorage.removeItem('auth_user');
    this.logged = false;
  }

  public get isLogged(): boolean {
    return (localStorage.getItem('auth_user') !== null) || this.logged;
  }
}
interface Credential {
  username: string,
  password: string
}