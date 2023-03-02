import { Component, ViewChild } from '@angular/core';
import { Section } from 'src/assets/section';
import { AddExperienceComponent } from './add-experience/add-experience.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent extends Section{
  personalExperience: any;
  override campo = 'Experiencia';
  override field = 'experience';
  employTypes: EmployType[] = [];

  @ViewChild(AddExperienceComponent) editModal!: AddExperienceComponent;

  addItem(item: Experience) {
    this.personalData.addItem(item, this.field).subscribe(() => {
      this.getExperience();
    });
    this.showSuccess('add');
  }

  save(item: Experience) {
    this.personalData.updateItem(item, this.field).subscribe(() => {
      this.getExperience();
    });
    this.showSuccess('edit');
  }

  deleteItem(item: Experience) {
    this.personalData.deleteItem(item, this.field).subscribe(() => {
      this.personalExperience = this.personalExperience.filter((i: { id: number }) => i.id !== item.id);
    });
    this.showDelete();
  }

  getCardPosition(item: Experience): number {
    let chosenItem = this.personalExperience.find((i: { id: number }) => i.id === item.id)
    let position = this.personalExperience.indexOf(chosenItem!);
    return position;
  }

  appendRelations(item: Experience) {
    let type = this.employTypes.find((i: EmployType) => i.id === item.employTypeId);
    item.employType = type!;
  }

  getExperience() {
    this.personalData.getData(`${this.field}?_sort=endDate&_order=desc&_expand=employType`).subscribe(data => {
      this.personalExperience = data;
    });
  }

  override getData() {
    this.getExperience();
    this.personalData.getData('employTypes').subscribe(data => {
      this.employTypes = data;
    });
  }
}

export interface Experience {
  id?: number,
  company: string,
  position: string,
  employTypeId: number,
  startDate: string,
  endDate?: string,
  current: boolean
  description: string
  employType: EmployType
}

export interface Company {
  id: number,
  name: string,
  logo?: string
}

export interface EmployType {
  id: number,
  name: string
}