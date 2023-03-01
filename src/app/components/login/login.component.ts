import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  remember: boolean = false;
  faBack = faArrowLeft;

  constructor(private authService: AuthService){}

  logIn(logData:LoginData){
    this.authService.login(logData.username, logData.password, logData.remember);
  }
}
interface LoginData{
  username: string,
  password: string,
  remember: boolean
}
