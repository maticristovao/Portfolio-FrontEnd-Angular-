import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faAt, faEye, faEyeSlash, faKey, faUserPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form: FormGroup;
  show: boolean = false;
  remember: boolean = false;


  faBack = faArrowLeft;
  faUsername = faUserShield;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, []]
    })
  }

  toggleVisibility() {
    this.show = !this.show;
  }

  get Username() {
    return this.form.get('username');
  }
  get Password() {
    return this.form.get('password');
  }
  get Remember() {
    return this.form.get('remember');
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
