import { Component, Input } from '@angular/core';
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent {
@Input() name!:string;
@Input() mail!:string;
@Input() phoneNum!:string;
@Input() phoneType!:string;

faPhone = faPhone;
faMobile = faMobile;
faEnvelope = faEnvelope;
}