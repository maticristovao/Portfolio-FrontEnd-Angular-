import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft, faAt, faCircleUser, faEye, faEyeSlash, faHome, faKey, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  remember:boolean = false;
  signMode:boolean = false;

  faBack = faArrowLeft;

  toggleMode(boolean:boolean){
    this.signMode = boolean;
  }
}
