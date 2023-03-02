import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { Section } from 'src/assets/section';
import { AddSkillComponent } from './add-skill/add-skill.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends Section {
  skills: Skill[] = [];
  languages: Language[] = [];

  @ViewChild(AddSkillComponent) editModal!: AddSkillComponent;

  getData(): void {
    this.personalData.getData('skills?_sort=id').subscribe(data => {
      this.skills = data;
    });
    this.personalData.getData('languages').subscribe(data => {
      this.languages = data;
    });
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  //   this.skills.forEach(async skill => {
  //     skill.id = this.skills.indexOf(skill) + 1;
  //     await this.save(skill);
  //   });
  // }

  isSkill(object: any): object is Skill {
    return 'progress' in object;
  }

  deleteItem(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.deleteItem(item, 'skills').subscribe(() => {
        this.skills = this.skills.filter((i: { id: number | undefined; }) => i.id !== item.id);
        this.showDelete('Habilidades');
      });
    } else {
      this.personalData.deleteItem(item, 'languages').subscribe(() => {
        this.languages = this.languages.filter((i: { id: number | undefined; }) => i.id !== item.id);
        this.showDelete('Idiomas');
      });
    }
  }

  addItem(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.addItem(item, 'skills').subscribe((skill) => {
        this.skills.push(skill);
        this.showSuccess('add', 'Habilidades');
      });
    } else {
      this.personalData.addItem(item, 'languages').subscribe((lang) => {
        this.languages.push(lang);
        this.showSuccess('add', 'Idiomas');
      });
    }
  }

  save(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.updateItem(item, 'skills').subscribe(() => {
        this.getAndSwitch(this.skills, item);
        this.showSuccess('edit', 'Habilidades');
      });
    } else {
      this.personalData.updateItem(item, 'languages').subscribe(() => {
        this.getAndSwitch(this.languages, item);
        this.showSuccess('edit', 'Idiomas');
      });
    }
  }

  override passData(item: Skill | Language) {
    this.toggleModal();
    if (this.isSkill(item)) {
      this.editModal.loadSkill(item);
    } else {
      this.editModal.loadLanguage(item);
    }
  }

  getAndSwitch(collection: any, item: Skill | Language) {
    let edited = collection.find((i: Skill | Language) => i.id === item.id);
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