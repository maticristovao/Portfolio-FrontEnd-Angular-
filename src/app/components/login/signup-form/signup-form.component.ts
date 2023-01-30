import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAt, faCircleUser, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  // @Input() signMode:boolean = false;
  form: FormGroup;
  show:boolean = false;
  showConfirm:boolean = false;

  faAt = faAt;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCircleUser = faCircleUser;
  faLock = faLock;
  

  constructor(private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      mail:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#"¡¿=)({}[/+?!@$%^&*-]).*$')]],
      confirm:['', [Validators.required]]
    },
    {
      validator: this.ConfirmValidator('password', 'confirm')
    })
  }

  ConfirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  toggleVisibility(){
    this.show = !this.show;
  }

  toggleConfirmVisibility(){
    this.showConfirm = !this.showConfirm;
  }

  get Name(){
    return this.form.get('mail');
  }
  
  get Surname(){
    return this.form.get('mail');
  }

  get Mail(){
    return this.form.get('mail');
  }
  get Password(){
    return this.form.get('password');
  }
  get Confirm(){
    return this.form.get('confirm');
  }

  onSubmit(){
    if(this.form.valid){
      this.form.reset();
    }else{
      this.form.markAllAsTouched();
    }
  }
}
