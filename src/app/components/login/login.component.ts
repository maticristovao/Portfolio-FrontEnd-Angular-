import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft, faAt, faEye, faEyeSlash, faHome, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // form!:FormGroup;
  show:boolean = false;
  remember:boolean = false;

  faBack = faArrowLeft;
  faAt = faAt;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  toggleVisibility(){
    this.show = !this.show;
  }

  // constructor(private formBuilder:FormBuilder){
    // this.form = this.formBuilder.group({

    // })
  // }


}
