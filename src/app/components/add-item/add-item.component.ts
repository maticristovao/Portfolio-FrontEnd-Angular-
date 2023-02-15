import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

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
  ],
  encapsulation: ViewEncapsulation.None
})

export class AddItemComponent {
  today!: Date;
  add:boolean = true;
  form!:FormGroup;
  initialValue:any;
  faExit = faTimes;

  @ViewChild('content') myModal!:ElementRef;
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(protected formBuilder:FormBuilder, protected modalService:NgbModal, protected datepipe?:DatePipe){
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
