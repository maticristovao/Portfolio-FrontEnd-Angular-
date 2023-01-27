import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent {
  editing:boolean = false;

  @Input() horizontal:boolean = false;
  @Output() edition = new EventEmitter()
  

  faPencil = faPencil;
  faCheck = faCheck;
  faClose = faXmark;
  

  editMode(){
    this.editing = !this.editing;
    this.edition.emit();
  }

  discard(){
    this.editing = false;
  }
}
