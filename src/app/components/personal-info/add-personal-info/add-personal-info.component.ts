import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../add-item/add-item.component';
import { COMMA, ENTER, DASH, SLASH } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { UserData } from '../personal-info.component';
import { Phone } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-add-personal-info',
  templateUrl: './add-personal-info.component.html',
  styleUrls: ['./add-personal-info.component.css']
})
export class AddPersonalInfoComponent extends AddItemComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA, DASH, SLASH] as const;
  titles: string[] = [];
  countries: Country[] = [];
  provinces: Province[] = [];

  get Name() {
    return this.form.get('name');
  }
  get Surname() {
    return this.form.get('surname');
  }
  get Title() {
    return this.form.get('title');
  }
  get Email() {
    return this.form.get('email');
  }
  // get Phone1() {
  //   return this.form.get('phone1');
  // }
  // get Phone2() {
  //   return this.form.get('phone2');
  // }
  get Province() {
    return this.form.get('province');
  }
  get Country() {
    return this.form.get('country');
  }
  get Photo() {
    return this.form.get('photo');
  }

  added(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.titles.push(value);
    }
    event.chipInput!.clear();
  }

  remove(title: string): void {
    const index = this.titles.indexOf(title);

    if (index >= 0) {
      this.titles.splice(index, 1);
    }
  }

  edit(title: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(title);
      return;
    }
    const index = this.titles.indexOf(title);
    if (index >= 0) {
      this.titles[index] = value;
    }
  }

  loadEditData(user: UserData) {
    this.form.setValue({
      name: user.name,
      surname: user.surname,
      title: user.title,
      // phone1: phones[0].number,
      // phoneType1: phones[0].type,
      // phone2: phones[1] ? phones[1].number : '',
      // phoneType2: phones[1] ? phones[1].type : 'Móvil',
      email: user.email,
      province: user.province,
      country: user.country,
      photo: user.photo
    })
    this.titles = [];
    user.title.forEach(title => this.titles.push(title));
  }

  getData(field: string, property: any) {
    this.personalData.getData(field).subscribe(data => {
      property = data;
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      title: [this.titles, [Validators.required, Validators.maxLength(2), Validators.max(20)]],
      email: ['', [Validators.required, Validators.email]],
      // phone1: ['', [Validators.required, Validators.pattern('[- +()0-9]{6,14}')]],
      // phoneType1: ['', [Validators.required]],
      // phone2: ['', [Validators.pattern('[- +()0-9]{6,14}')]],
      // phoneType2: ['', []],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      photo: ['', []]
    });
  }

  override onSubmit(): void {
    if (this.form.valid) {
      const newUser = this.form.value;
      // const newPhones = [
      //   {
      //     id: 1,
      //     number: this.Phone1?.value,
      //     type: this.form.value.phoneType1,
      //     userId: 1
      //   },
      //   {
      //     id: 2,
      //     number: this.Phone2?.value,
      //     type: this.form.value.phoneType2,
      //     userId: 1
      //   }
      // ];
      // if (!this.Phone2?.value) {
      //   newPhones.splice(1, 1);
      // }
      this.onUpdateItem.emit(newUser);
      this.close();
    } else {
      this.form.markAllAsTouched();
    }
  }
}

export interface Country {
  id: number,
  name: string
}

export interface Province {
  id: number,
  name: string,
  countryId: number
}