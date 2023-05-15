import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faMobile, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';

  faPhone = faPhone;
  faMobile = faMobile;
  faEnvelope = faEnvelope;
  faExit = faXmark;

  constructor() { }

  ngOnInit(): void {
  }
}