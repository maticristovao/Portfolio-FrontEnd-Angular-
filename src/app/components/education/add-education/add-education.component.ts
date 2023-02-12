import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Area, Education, Institution } from '../education.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepicker } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }],
  encapsulation: ViewEncapsulation.None
})

export class AddEducationComponent {
  faExit = faTimes;
  today: Date;
  add:boolean = true;
  form:FormGroup;
  initialValue:any;
  
  @ViewChild('content') myModal!:ElementRef;
  @Input()institutions:Institution[]=[];
  @Input()areas:Area[]=[];
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe, private modalService:NgbModal){
    this.form = this.formBuilder.group({
      id:undefined,
      title:['', [Validators.required, Validators.minLength(6)]],
      institutionId:['', [Validators.required]],
      areaId:['', [Validators.required]],
      startDate:[moment(), [Validators.required]],
      endDate:[moment(), [Validators.required]]
    });
    this.initialValue = this.form.value;

    let currentDate = new Date();
    // this.today = this.formatDate(currentDate);
    this.today = new Date();
  }

  formatDate(date:string | number | Date): string{
    return this.datepipe.transform(date, 'YYYY-MM')!;
  }

  open(content:any){
    this.modalService.open(content, {centered:true, backdropClass: 'custom-backdrop'});
  }

  close(){
    this.modalService.dismissAll();
  }

  get Title(){
    return this.form.get('title');
  }
  get InstitutionId(){
    return this.form.get('institutionId');
  }
  get AreaId(){
    return this.form.get('areaId');
  }
  get StartDate(){
    return this.form.get('startDate');
  }
  get EndDate(){
    return this.form.get('endDate');
  }
  
  loadEditData(card:Education){
    this.form.setValue({
      id: card.id,
      title: card.title,
      institutionId: card.institutionId,
      areaId: card.areaId,
      startDate: moment(card.startDate),
      endDate: moment(card.endDate) 
    })
    this.add = false;
  }

  reset(){
    console.log(this.initialValue);
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
  setMonthAndYear(normalizedMonthAndYear: Moment, control:AbstractControl, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = control.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    let formatValue = this.formatDate(ctrlValue);
    control.setValue(formatValue);
    datepicker.close();
  }
}
