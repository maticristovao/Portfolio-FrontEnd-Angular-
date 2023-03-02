import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../add-item/add-item.component';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent extends AddItemComponent implements OnInit {

  get About() {
    return this.form.get('about');
  }

  override loadEditData(description: string) {
    this.form.setValue({
      about: description
    })
  }

  override onSubmit() {
    if (this.form.valid) {
      const NEWITEM = this.form.value;
      this.onUpdateItem.emit(NEWITEM);
      this.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      about: ['', [Validators.required, Validators.minLength(100)]]
    });
  }
}
