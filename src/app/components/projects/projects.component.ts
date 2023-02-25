import { Component, OnInit, ViewChild } from '@angular/core';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  field = 'projects';
  faCode = faCode;
  faCodePen = faCodepen;
  editMode: boolean = false;

  @ViewChild(AddProjectComponent) editModal!: AddProjectComponent;

  constructor(private personalData: PersonalInfoService) { }

  toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  addItem(item: Project) {
    this.personalData.addItem(item, this.field).subscribe((project) => {
      this.projects.push(project);
    });
  }

  saveItem(item: Project) {
    this.personalData.updateItem(item, this.field).subscribe(() => {
      this.getAndSwitch(this.projects, item);
    });
  }

  deleteItem(item: Project) {
    this.personalData.deleteItem(item, this.field).subscribe(() => {
      this.projects = this.projects.filter((i: { id: number }) => i.id !== item.id);
    });
  }

  passData(item: Project) {
    this.toggleModal();
    this.editModal.loadEditData(item);
  }

  getAndSwitch(collection: any, item: Project) {
    let edited = collection.find((i: Project) => i.id === item.id);
    let position = collection.indexOf(edited!)
    collection[position] = item;
  }

  ngOnInit(): void {
    this.personalData.getData(this.field).subscribe(data => {
      this.projects = data;
    })
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