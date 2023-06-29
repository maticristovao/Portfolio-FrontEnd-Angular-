import { Component, Input } from '@angular/core';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faCode, faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {
  visible = false
  @Input() project: any;
  @Input() even!: boolean;

  faLink = faLink;
  faCode = faCode;
  faCodePen = faCodepen;
}