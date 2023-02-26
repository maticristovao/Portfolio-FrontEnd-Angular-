import { Component, ViewEncapsulation } from '@angular/core';
import { faEnvelope, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  faEnvelope = faEnvelope;
  faOpen = faEnvelopeOpenText;
}
