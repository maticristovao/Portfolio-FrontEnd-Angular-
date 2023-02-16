import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddExperienceComponent } from './add-experience/add-experience.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit{
  personalExperience:any;
  intersecting:boolean = false;
  windowWidth:number = window.innerWidth;
  editMode:boolean = false;
  field:string = 'experience';
  employTypes:EmployType[] = [];

  @ViewChild(AddExperienceComponent) editModal!:AddExperienceComponent;
  
  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService){}

  addItem(item:Experience){
    this.personalData.addItem(item, this.field).subscribe(()=>{
      this.getExperience();
    });
  }

  save(item:Experience){
    this.personalData.updateItem(item, this.field).subscribe(()=>{
      this.getExperience();
    });
  }

  deleteItem(item:Experience){
    this.personalData.deleteItem(item, this.field).subscribe(()=>{
      this.personalExperience = this.personalExperience.filter((i: { id: number | undefined; }) => i.id !== item.id);
    });
  }

  getCardPosition(item:Experience):number{
    let chosenItem = this.personalExperience.find((i: { id: number | undefined; }) => i.id===item.id)
    let position = this.personalExperience.indexOf(chosenItem!);
    return position;
  }

  appendRelations(item:Experience){
    let type = this.employTypes.find((i:EmployType) => i.id === item.employTypeId);
    item.employType = type!;
  }

  toggleModal(){
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  passData(card:any){
    this.toggleModal();
    this.editModal.loadEditData(card);
  }

  getExperience(){
    this.personalData.getData(`${this.field}?_sort=endDate&_order=desc&_expand=employType`).subscribe(data => {
      this.personalExperience = data;
    })
  }

  ngOnInit(): void {
    this.getExperience();
    this.personalData.getData('employTypes').subscribe(data =>{
      this.employTypes = data;
    });
  }
}

export interface Experience{
  id?:number,
  company:string,
  position:string,
  employTypeId:number,
  startDate:string,
  endDate?:string,
  current:boolean
  description:string
  employType:EmployType
}

export interface Company{
  id:number,
  name:string,
  logo?:string
}

export interface EmployType{
  id:number,
  name:string
}