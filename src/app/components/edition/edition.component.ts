import { Component, Input } from '@angular/core';
import { faCheck, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent {
  @Input() horizontal:boolean = false;
  editing:boolean = false;
  

  faPencil = faPencil;
  faCheck = faCheck;
  faClose = faXmark;
  

  editMode(){
    this.editing = !this.editing;
  }
}
