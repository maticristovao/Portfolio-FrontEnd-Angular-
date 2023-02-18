import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

export const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }
  ]
})

export class AddItemComponent {
  form!:FormGroup;
  initialValue:any;
  add:boolean = true;
  matcher:LiveErrorMatcher = new LiveErrorMatcher();
  today!: Date;
  faExit = faTimes;

  @ViewChild('content') myModal!:ElementRef;
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(protected formBuilder:FormBuilder, protected modalService:NgbModal, protected datepipe:DatePipe, protected personalData:PersonalInfoService){
    this.today = new Date()
  }

  formatDate(date:string | number | Date): string{
    return this.datepipe!.transform(date, 'YYYY-MM')!;
  }

  open(content:any){
    this.modalService.open(content, {centered:true, backdropClass: 'custom-backdrop'});
  }

  close(){
    this.modalService.dismissAll();
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, control:AbstractControl, datepicker: MatDatepicker<Moment>) {
    control.setValue(moment());
    const ctrlValue = control.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    let formatValue = this.formatDate(ctrlValue);
    control.setValue(formatValue);
    datepicker.close();
  }

  
  endAfter(startCrtl:string, endCtrl:string){
      return (formGroup:FormGroup) => {
        const start = formGroup.controls[startCrtl];
        const end = formGroup.controls[endCtrl];
        if((start.errors && !start.errors['endafter']) || (end.errors  && !end.errors['endafter'])){
          return;
        }
        if(start.value > end.value ){
          end.setErrors({ endafter: true });
        }else{
          end.setErrors(null);
        }
      }
    }

  reset(){
    this.form.reset(this.initialValue);
    this.add = true;
  }

  onSubmit(){
    if(this.form.valid){
      const newItem = this.form.value;
      if(!newItem.id){
        this.onAddItem.emit(newItem);
      }else{
        this.onUpdateItem.emit(newItem);
      }
      this.close();
      this.reset();
    }else{
      this.form.markAllAsTouched();
    }
  }
}

export class LiveErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = control && control.invalid;
    return (invalidCtrl && (!control.hasError('minlength') && control.dirty || (control.touched || isSubmitted)))!;
  }
}