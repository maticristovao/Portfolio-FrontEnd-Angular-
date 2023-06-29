import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faEye, faEyeSlash, faKey, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ImageLoaderService } from 'src/app/services/image-loader.service';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { ErrorMatcher } from 'src/assets/error-matchers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showHint: boolean = false;
  imageUrl: string = '';

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastService: ToastrService, private imageLoader: ImageLoaderService, private loader: PersonalInfoService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, []]
    });
  }

  ngOnInit() {
    this.imageUrl = 'https://cdn.pixabay.com/photo/2020/05/07/04/01/digitization-5140071__340.jpg';
    this.loader.startLoader();

    this.imageLoader.loadImage(this.imageUrl)
      .then(() => {
        console.log('La imagen se cargó exitosamente');
        this.loader.hideLoader();
      })
      .catch((error) => {
        console.error('Error al cargar la imagen', error);
        // Maneja el error en caso de que ocurra
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