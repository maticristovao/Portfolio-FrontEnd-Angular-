import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faAt, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form:FormGroup;
  show:boolean = false;
  remember:boolean = false;
  

  faBack = faArrowLeft;
  faAt = faAt;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      mail:['', [Validators.required]],
      password:['', [Validators.required]],
      remember:[false, []]
    })
  }

  toggleVisibility(){
    this.show = !this.show;
  }

  get Mail(){
    return this.form.get('mail');
  }
  get Password(){
    return this.form.get('password');
  }
  get Remember(){
    return this.form.get('remember');
  }

  onSubmit(){
    if(this.form.valid){
      this.form.reset();
    }else{
      this.form.markAllAsTouched();
    }
  }
}
