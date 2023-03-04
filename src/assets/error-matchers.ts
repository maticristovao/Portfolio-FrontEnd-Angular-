import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class ErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null): boolean {
      const INVALIDCONTROL = control && control.invalid;
      return (INVALIDCONTROL && control.touched)!;
    }
}

export class LiveErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const SUBMITTED = form && form.submitted;
      const INVALIDCONTROL = control && control.invalid;
      return (INVALIDCONTROL && (!control.hasError('minlength') && control.dirty || (control.touched || SUBMITTED)))!;
    }
  }