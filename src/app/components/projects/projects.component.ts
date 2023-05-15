import { Component, ViewChild } from '@angular/core';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { Section } from 'src/assets/section';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends Section {
  projects: Project[] = [];
  override field = 'project';
  override campo = 'Proyectos';
  faCode = faCode;
  faCodePen = faCodepen;

  @ViewChild(AddProjectComponent) editModal!: AddProjectComponent;

  addItem(item: Project) {
    this.personalData.addItem(item, this.field).subscribe((project) => {
      this.projects.push(project);
      this.showSuccess('add');
    });
  }

  saveItem(item: Project) {
    this.personalData.updateItem(item, this.field).subscribe(() => {
      this.getAndSwitch(this.projects, item);
      this.showSuccess('edit');
    });
  }

  deleteItem(item: Project) {
    this.personalData.deleteItem(item, this.field).subscribe(() => {
      this.projects = this.projects.filter((i: { id: number }) => i.id !== item.id);
      this.showDelete();
    });
  }

  getAndSwitch(collection: any, item: Project) {
    let edited = collection.find((i: Project) => i.id === item.id);
    let position = collection.indexOf(edited!)
    collection[position] = item;
  }

  getData(): void {
    this.personalData.getData(`${this.field}/all`).subscribe(data => {
      this.projects = data;
    });
  }
}

export interface Project {
  id: number,
  title: string,
  description: string,
  repo: string,
  link?: string,
  image?: string,
  collection?: string
}