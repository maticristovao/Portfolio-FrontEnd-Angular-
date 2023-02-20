import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddSkillComponent } from './add-skill/add-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  skills:any;
  languages:any;
  windowWidth:number = window.innerWidth;
  editMode:boolean = false;

  @ViewChild(AddSkillComponent) editModal!:AddSkillComponent;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void {
    this.personalData.getData('skills').subscribe(data => {
      this.skills = data;
    });
    this.personalData.getData('languages').subscribe(data => {
      this.languages = data;
    });
  }

  toggleModal(){
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }

  isSkill(object:any): object is Skill{
    return 'progress' in object;
  }

  addItem(item: Skill | Language){
    if(this.isSkill(item)){
      this.personalData.addItem(item, 'skills').subscribe((skill)=>{
        this.skills.push(skill);
      });
    }else{
      this.personalData.addItem(item, 'languages').subscribe((lang)=>{
        this.languages.push(lang);
      });
    }
  }
}

export interface Skill{
  id:number,
  name:string,
  progress:number
}

export interface Language{
  id:number,
  name:string,
  oral:string,
  written:string
}

export enum Levels{
  Basic,
  Medium,
  Advanced,
  Native
}