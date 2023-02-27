import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router){}

  hasRoute(route:string):boolean{
    return this.router.url === route;
  }
}
