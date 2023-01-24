import { Component } from '@angular/core';
import { faCheck, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent {
  faPencil = faPencil;
  faCheck = faCheck;
  faClose = faXmark;
  editing:boolean = false;

  editMode(){
    this.editing = !this.editing;
  }
}
