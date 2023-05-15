import { Component, OnInit, ViewChild } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FileInput } from 'ngx-material-file-input';
import { Section } from 'src/assets/section';
import { AddPersonalInfoComponent, Province } from './add-personal-info/add-personal-info.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent extends Section implements OnInit {
  @ViewChild(AddPersonalInfoComponent) editModal!: AddPersonalInfoComponent;

  moreContent!: string;
  personalInfo: UserData | undefined;
  override field = 'user';
  override campo = 'Información personal';
  photo: string = '';

  faLocationDot = faLocationDot;

  override toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
    this.editModal.loadEditData(this.personalInfo!);
  }

  save(item: any) {
    this.personalData.patchItem(item, this.field).subscribe(() => {
      this.showSuccess('edit');
    });
  }

  getData(): void {
    this.personalData.getData(`${this.field}/1`).subscribe((user: UserData) => {
      this.personalInfo = user;
    });
    this.personalData.RefreshRequired.subscribe(() => this.getData());
  }
}

export interface UserData {
  name: string,
  surname: string,
  title: string,
  email: string,
  phone: string,
  province: Province,
  photo: any
}