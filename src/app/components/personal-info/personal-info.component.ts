import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddPersonalInfoComponent } from './add-personal-info/add-personal-info.component';
import { Phone } from './contact-modal/contact-modal.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild(AddPersonalInfoComponent) editModal!: AddPersonalInfoComponent;

  moreContent!: string;
  personalInfo: UserData | undefined;
  windowWidth: number = window.innerWidth;
  phones!: Phone[];

  faLocationDot = faLocationDot;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
    this.editModal.loadEditData(this.personalInfo!);
  }

  save(item: any) {
    this.personalData.patchItem(item, 'user/1').subscribe((user) => {
      this.personalInfo = user;
    });
  }

  constructor(private personalData: PersonalInfoService) { }

  ngOnInit(): void {
    this.personalData.getData('user/1?_embed=phones').subscribe((user: UserData) => {
      this.personalInfo = user;
      this.phones = user.phones!;
    });
  }
}

export interface UserData {
  name: string,
  surname: string,
  title: string[],
  email: string,
  phones?: Phone[],
  province: string,
  country: string,
  photo: any
}