import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faEye, faEyeSlash, faKey, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMatcher } from 'src/assets/error-matchers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showHint: boolean = false;

  form: FormGroup;
  show: boolean = false;
  faBack = faArrowLeft;
  faUsername = faUserShield;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  matcher: ErrorMatcher = new ErrorMatcher();
  toastConfig: Partial<IndividualConfig> = {
    positionClass: 'log-container',
    progressBar: false
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastService: ToastrService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, []]
    });
  }

  get Username() {
    return this.form.get('username');
  }
  get Password() {
    return this.form.get('password');
  }

  toggleVisibility() {
    this.show = !this.show;
  }

  logIn(logData: LoginData) {
    this.authService.login(logData.username, logData.password, logData.remember);

    if (this.authService.isLogged) {
      this.toastService.success('Inicio de sesión exitoso', 'Log In', this.toastConfig);
    } else {
      this.toastService.error('Credenciales inválidas', 'Log In', this.toastConfig);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const LOGDATA = this.form.value;
      this.logIn(LOGDATA);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
interface LoginData {
  username: string,
  password: string,
  remember: boolean
}