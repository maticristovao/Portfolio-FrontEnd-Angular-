import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEraser, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  @Input() white:boolean = true;
  @Input() horizontal:boolean = false;
  @Input() editMode:boolean = false;

  @Output() deleteItem = new EventEmitter();
  @Output() updateItem = new EventEmitter();

  faPencil = faPencil;
  faDelete = faEraser;

  delete(){
    this.deleteItem.emit();
  }

  update(){
    this.updateItem.emit();
  }
}
