import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faMobile, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit{
  @Input() name!:string;
  mail!:Mail;
  phone!: Phone;

  faPhone = faPhone;
  faMobile = faMobile;
  faEnvelope = faEnvelope;
  faExit = faXmark;

  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void{
    this.personalData.getData('mail').subscribe(data => {
      this.mail = data;
    });
    this.personalData.getData('phone').subscribe(data => {
      this.phone = data;
    });
  }
}

export interface Mail{
  id: number,
  adress: string
}

export interface Phone{
  id: number,
  number: number,
  type: string
}