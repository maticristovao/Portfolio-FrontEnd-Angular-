import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddSkillComponent } from './add-skill/add-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  languages: Language[] = [];
  windowWidth: number = window.innerWidth;
  editMode: boolean = false;

  @ViewChild(AddSkillComponent) editModal!: AddSkillComponent;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData: PersonalInfoService) { }

  ngOnInit(): void {
    this.personalData.getData('skills').subscribe(data => {
      this.skills = data;
    });
    this.personalData.getData('languages').subscribe(data => {
      this.languages = data;
    });
  }

  toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }

  isSkill(object: any): object is Skill {
    return 'progress' in object;
  }

  deleteItem(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.deleteItem(item, 'skills').subscribe(() => {
        this.skills = this.skills.filter((i: { id: number | undefined; }) => i.id !== item.id);
      });
    } else {
      this.personalData.deleteItem(item, 'languages').subscribe(() => {
        this.languages = this.languages.filter((i: { id: number | undefined; }) => i.id !== item.id);
      });
    }
  }

  addItem(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.addItem(item, 'skills').subscribe((skill) => {
        this.skills.push(skill);
      });
    } else {
      this.personalData.addItem(item, 'languages').subscribe((lang) => {
        this.languages.push(lang);
      });
    }
  }
  
  passData(item: Skill | Language){
    this.toggleModal();
    if(this.isSkill(item)){
      this.editModal.loadSkill(item);
    }else{
      this.editModal.loadLanguage(item);
    }
  }

  save(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.updateItem(item, 'skills').subscribe(() => {
        this.getAndSwitch(this.skills, item);
      });
    } else {
      this.personalData.updateItem(item, 'languages').subscribe(() => {
        this.getAndSwitch(this.languages, item);
      });
    }
  }

  getAndSwitch(collection: any, item: Skill | Language) {
    let edited = collection.find((i: Skill|Language) => i.id === item.id);
    let position = collection.indexOf(edited!)
    collection[position] = item;
  }
}

export interface Skill {
  id: number,
  name: string,
  progress: number
}

export interface Language {
  id: number,
  name: string,
  oral: string,
  written: string
}

export enum Levels {
  Basic,
  Medium,
  Advanced,
  Native
}