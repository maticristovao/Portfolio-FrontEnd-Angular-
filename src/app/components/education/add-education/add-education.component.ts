import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Education, Institution } from '../education.component';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEducationComponent {
  faExit = faTimes;
  today: string;
  form:FormGroup = this.formBuilder.group({
    id:undefined,
    title:['', [Validators.required, Validators.minLength(6)]],
    institutionId:['', [Validators.required]],
    area:['', [Validators.required]],
    startDate:['', [Validators.required]],
    endDate:['', [Validators.required]]
  });
  
  @ViewChild('content') myModal!:ElementRef;
  @Input()institutions:Institution[]=[];
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe, private modalService:NgbModal, private calendar:NgbCalendar){
    let currentDate = new Date();
    this.today = this.datepipe.transform(currentDate, 'YYYY-MM-dd')!;
  }

  open(content?:any){
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
  get Area(){
    return this.form.get('area');
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
      area: card.area,
      startDate: card.startDate,
      endDate: card.endDate
    })
  }

  reset(){
    this.form.reset();
  }

  onSubmit(){
    if(this.form.valid && this.form.value.startDate<this.today){
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
