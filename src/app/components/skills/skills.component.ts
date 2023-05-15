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
  levels: Level[] = [];

  @ViewChild(AddSkillComponent) editModal!: AddSkillComponent;

  getData(): void {
    this.personalData.getData('skill/all').subscribe(data => {
      this.skills = data;
    });
    this.personalData.getData('language/all').subscribe(data => {
      this.languages = data;
    });
    this.personalData.getData('level/all').subscribe(data => {
      this.levels = data;
    });
  }

  isSkill(object: any): object is Skill {
    return 'progress' in object;
  }

  deleteItem(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.deleteItem(item, 'skill').subscribe(() => {
        this.skills = this.skills.filter((i: { id: number | undefined; }) => i.id !== item.id);
        this.showDelete('Habilidades');
      });
    } else {
      this.personalData.deleteItem(item, 'language').subscribe(() => {
        this.languages = this.languages.filter((i: { id: number | undefined; }) => i.id !== item.id);
        this.showDelete('Idiomas');
      });
    }
  }

  addItem(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.addItem(item, 'skill').subscribe((skill) => {
        this.skills.push(skill);
        this.showSuccess('add', 'Habilidades');
      });
    } else {
      this.personalData.addItem(item, 'language').subscribe((lang) => {
        this.appendRelations(lang);
        this.languages.push(lang);
        this.showSuccess('add', 'Idiomas');
      });
    }
  }
  appendRelations(item: Language): void {
    let oralLevel = this.levels.find((l: Level) => l.id === item.oral);
    item.oralLevel = oralLevel!;
    let writtenLevel = this.levels.find((l: Level) => l.id === item.written);
    item.writtenLevel = writtenLevel!;
  }

  save(item: Skill | Language) {
    if (this.isSkill(item)) {
      this.personalData.updateItem(item, 'skill').subscribe(() => {
        this.getAndSwitch(this.skills, item);
        this.showSuccess('edit', 'Habilidades');
      });
    } else {
      this.personalData.updateItem(item, 'language').subscribe(() => {
        this.appendRelations(item);
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
  oral: number,
  written: number,
  oralLevel: Level,
  writtenLevel: Level
}

export interface Level {
  id: number,
  name: string
}