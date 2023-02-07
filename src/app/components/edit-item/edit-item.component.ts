import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faDeleteLeft, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  @Input() white:boolean = false;
  @Input() horizontal:boolean = false;
  @Input() editMode:boolean = false;

  @Output() deleteItem = new EventEmitter()

  faPencil = faPencil;
  faDelete = faDeleteLeft;

  delete(){
    this.deleteItem.emit();
  }
}
