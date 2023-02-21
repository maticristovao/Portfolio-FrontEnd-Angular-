import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FileInput } from 'ngx-material-file-input/lib/model/file-input.model';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddPersonalInfoComponent } from './add-personal-info/add-personal-info.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild(AddPersonalInfoComponent) editModal!: AddPersonalInfoComponent;

  moreContent!: string;
  personalInfo!: UserData;
  windowWidth: number = window.innerWidth;
  phone: any;

  faLocationDot = faLocationDot;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
    this.editModal.loadEditData(this.personalInfo);
  }

  save(item: UserData) {
    this.personalData.patchItem(item, 'user').subscribe((user) => {
      this.personalInfo = user;
    });
  }

  constructor(private personalData: PersonalInfoService) { }

  ngOnInit(): void {
    this.personalData.getData('user').subscribe(data => {
      this.personalInfo = data;
    });
    this.personalData.getData('phone').subscribe(data => {
      this.phone = data;
    });
  }
}

export interface UserData {
  name: string,
  surname: string,
  title: string[],
  province: string,
  country: string,
  photo: any
}