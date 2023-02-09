import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { faEye, faKey, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Education } from '../education/education.component';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Modal from 'bootstrap/js/dist/modal';
declare var bootstrap:any;
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AddItemComponent {
  faExit = faTimes;
  faUsername = faUser;
  faKey = faKey;
  faEye = faEye;
  currentDate: string | null;
  form:FormGroup = this.formBuilder.group({
    id:null,
    title:['', [Validators.required, Validators.minLength(10)]],
    institution:['', []],
    area:['', []],
    startDate:['', []],
    endDate:['', []],
    logo:['', []]
  });
  
  @ViewChild('content') myModal!:ElementRef;
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe, private modalService:NgbModal){
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
      institution: card.institution,
      area: card.area,
      startDate: card.startDate,
      endDate: card.endDate,
      logo: card.logo
    })
  }

  reset(){
    this.form.reset()
  }

  onSubmit(){
    // console.log(this.modal.nativeElement);
    // this.modal.nativeElement.classList.remove('show');
    if(this.form.valid && (this.form.value.startDate < this.currentDate!  ||  !this.form.value.startDate)){
      const newItem = {
        id: this.form.value.id,
        title: this.form.value.title,
        institution: this.form.value.institution,
        area: this.form.value.area,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        logo: this.form.value.logo
      }
      if(newItem.id === null){
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

  open(content?:any){
    this.modalService.open(content);
  }

  close(){
    this.modalService.dismissAll();
  }
}
