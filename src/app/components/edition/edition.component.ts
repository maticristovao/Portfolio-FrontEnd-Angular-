import { getLocaleWeekEndRange } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { faCheck, faDeleteLeft, faPencil, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.css']
})
export class EditionComponent {
  editing:boolean = false;
  windowWidth:number = window.innerWidth;
  
  @Input() horizontal:boolean = false;
  @Input() showAdding:boolean = false;
  @Input() editOnly:boolean = false;

  @Output() edition = new EventEmitter()
  @Output() adding = new EventEmitter()
  @Output() discard = new EventEmitter()
  

  faPencil = faPencil;
  faCheck = faCheck;
  faDiscard = faTrashCan;
  faPlus = faPlus;
  
  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }
  
  editMode(){
    if(!this.editOnly){
      this.editing = !this.editing;
    }
    this.edition.emit();
  }

  deleteSection(){
    this.editing = false;
    this.discard.emit();
  }

  addItem(){
    this.adding.emit();
  }

  defineTranslation(){
    switch (true){
      case (this.showAdding && this.windowWidth<800):
        return '-94px';

      case (!this.showAdding && this.windowWidth>=800):
        return '-65px';

      case (!this.showAdding && this.windowWidth<800):
        return '-47px';

      // this.showAdding && this.windowWidth>=800
      default:
        return '-130px';
    }
  }
}
