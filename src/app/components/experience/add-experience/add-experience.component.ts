import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from '../experience.component';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent {
  faExit = faTimes;
  currentDate: string | null;
  form:FormGroup = this.formBuilder.group({
    id:undefined,
    company:['', [Validators.required, Validators.minLength(2)]],
    employType:['', [Validators.required]],
    startDate:['', [Validators.required]],
    endDate:[{value:'', disabled:false}, []],
    current:[false||undefined, []],
    description:['', []]
  },
  {validator:this.finishedOrCurrent('endDate', 'current')});
  
  @ViewChild('content') myModal!:ElementRef;
  @Output() onAddItem:EventEmitter<any> = new EventEmitter();
  @Output() onUpdateItem:EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder:FormBuilder, private datepipe:DatePipe, private modalService:NgbModal){
    let date:Date = new Date();
    this.currentDate = this.datepipe.transform(date, 'YYYY-MM-ddTHH:MM');
  }

  finishedOrCurrent(affectedControl: string, toggleRequire: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[affectedControl];
      const requireFactor = formGroup.controls[toggleRequire];
      if (control.errors && !control.errors['required']) {
        return;
      }
      if (!control.value && (requireFactor.value === false || !requireFactor.value)) {
        control.setErrors({ required: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  open(content?:any){
    this.modalService.open(content, {centered:true, backdropClass: 'custom-backdrop'});
  }

  close(){
    this.modalService.dismissAll();
  }

  get Company(){
    return this.form.get('company');
  }
  get EmployType(){
    return this.form.get('employType');
  }
  get StartDate(){
    return this.form.get('startDate');
  }
  get EndDate(){
    return this.form.get('endDate');
  }
  get Current(){
    return this.form.get('current');
  }
  get Description(){
    return this.form.get('description');
  }
  
  loadEditData(item:Experience){
    this.form.patchValue({
      id: item.id,
      company: item.company,
      employType: item.employType,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      description: item.description
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

  ngOnInit(): void {
    this.form.get('current')!.valueChanges.subscribe(value => {
       if (value) {
          // disable the input when new value is true
          this.form.get('endDate')!.disable();
       } else {
          // (re-)enable the input when new value is false
          this.form.get('endDate')!.enable();
       }
    }) 
  }
}
