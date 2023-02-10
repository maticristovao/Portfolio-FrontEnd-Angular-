import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Education } from '../education.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddEducationComponent {
  faExit = faTimes;
  currentDate: string | null;
  form:FormGroup = this.formBuilder.group({
    id:undefined,
    title:['', [Validators.required, Validators.minLength(6)]],
    institution:['', [Validators.required]],
    area:['', [Validators.required]],
    startDate:['', [Validators.required]],
    endDate:['', [Validators.required]],
    logo:['', []]
  });
  
  @ViewChild('content') myModal!:ElementRef;
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe, private modalService:NgbModal){
    let date:Date = new Date();
    this.currentDate = this.datepipe.transform(date, 'YYYY-MM-ddTHH:MM');
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
  get Institution(){
    return this.form.get('institution');
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
    this.form.patchValue({
      id: card.id,
      title: card.title,
      institution: card.institution,
      area: card.area,
      startDate: card.startDate,
      endDate: card.endDate,
      logo: card.logo
    })
  }

  reset(){
    this.form.reset();
  }

  onSubmit(){
    if(this.form.valid && (this.form.value.startDate < this.currentDate!  ||  !this.form.value.startDate)){
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
