import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { faEye, faKey, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
declare var $:any;
declare var bootstrap:any;
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent {
  faExit = faTimes;
  faUsername = faUser;
  faKey = faKey;
  faEye = faEye;
  form:FormGroup;
  currentDate: string | null;

  

  @Output() onAddItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe){
    this.form = this.formBuilder.group({
      title:['', [Validators.required, Validators.minLength(10)]],
      institution:['', []],
      area:['', []],
      startDate:['', []],
      endDate:['', []]
    })

    let date:Date = new Date();
    this.currentDate = this.datepipe.transform(date, 'YYYY-MM-ddTHH:MM');
  }

  get Title(){
    return this.form.get('title');
  }
  get Institution(){
    return this.form.get('institution');
  }
  get Area(){
    return this.form.get('area');
  }
  get startDate(){
    return this.form.get('startDate');
  }
  get endDate(){
    return this.form.get('endDate');
  }
  
  onSubmit(){
    if(this.form.valid && (this.form.value.startDate < this.currentDate!  ||  !this.form.value.startDate)){
      const newItem = {
        title: this.form.value.title,
        institution: this.form.value.institution,
        area: this.form.value.area,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate
      }
      this.onAddItem.emit(newItem);
      this.form.reset();
      // console.log(this.modal.nativeElement);
      // (<any>$(this.modal.nativeElement)).modal('hide');
      // const modal:any = document.querySelector('#editForm');
      // console.log(modal);
      // modal.modal('hide');
    }else{
      this.form.markAllAsTouched();
    }
  }
}
