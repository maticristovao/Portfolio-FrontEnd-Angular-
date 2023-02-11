import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Area, Education, Institution } from '../education.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEducationComponent {
  faExit = faTimes;
  today: string;
  add:boolean = true;
  form:FormGroup = this.formBuilder.group({
    id:undefined,
    title:['', [Validators.required, Validators.minLength(6)]],
    institutionId:['', [Validators.required]],
    areaId:['', [Validators.required]],
    startDate:['', [Validators.required]],
    // endDate:['', [Validators.required]]
  });
  
  @ViewChild('content') myModal!:ElementRef;
  @Input()institutions:Institution[]=[];
  @Input()areas:Area[]=[];
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe, private modalService:NgbModal){
    let currentDate = new Date();
    this.today = this.datepipe.transform(currentDate, 'YYYY-MM')!;
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
  get AreaId(){
    return this.form.get('areaId');
  }
  get StartDate(){
    return this.form.get('startDate');
  }
  // get EndDate(){
  //   return this.form.get('endDate');
  // }
  
  loadEditData(card:Education){
    this.form.setValue({
      id: card.id,
      title: card.title,
      institutionId: card.institutionId,
      areaId: card.areaId,
      startDate: card.startDate,
      // endDate: card.endDate
    })
    this.add = false;
  }

  reset(){
    this.form.reset();
    this.add = true;
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
