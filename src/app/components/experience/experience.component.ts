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

  @ViewChild(AddExperienceComponent) editModal!:AddExperienceComponent;
  
  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService){}

  addItem(item:Experience){
    this.personalData.addItem(item, this.field).subscribe((card)=>{
      this.personalExperience.push(card);
    });
  }

  save(item:Experience){
    this.personalData.updateItem(item, this.field).subscribe((i)=>{
      this.personalExperience[this.getCardPosition(i)] = i;
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

  toggleModal(){
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  passData(card:any){
    this.toggleModal();
    this.editModal.loadEditData(card);
  }

  ngOnInit(): void {
    this.personalData.getData('experience').subscribe(data => {
      this.personalExperience = data;
    })
  }
}

export interface Experience{
  id?:number,
  company:string,
  employType:string,
  startDate:string,
  endDate?:string,
  current?:boolean
  description:string
}
