import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../add-item/add-item.component';
import { COMMA, ENTER, DASH, SLASH } from '@angular/cdk/keycodes';
import { UserData } from '../personal-info.component';

@Component({
  selector: 'app-add-personal-info',
  templateUrl: './add-personal-info.component.html',
  styleUrls: ['./add-personal-info.component.css']
})
export class AddPersonalInfoComponent extends AddItemComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA, DASH, SLASH] as const;
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
  get Phone() {
    return this.form.get('phone');
  }
  get Province_id() {
    return this.form.get('province_id');
  }
  get Country_id() {
    return this.form.get('country_id');
  }
  get Photo() {
    return this.form.get('photo');
  }

  override loadEditData(user: UserData) {
    this.form.setValue({
      name: user.name,
      surname: user.surname,
      title: user.title,
      phone: user.phone,
      email: user.email,
      province_id: user.province.id,
      country_id: user.province.country.id,
      photo: user.photo
    })
  }

  getData(id?: number) {
    this.personalData.getData("country/all").subscribe(data => {
      this.countries = data;
    });
    if (id) {
      this.personalData.getData(`province/country/${id}`).subscribe(data => {
        this.provinces = data;
      });
    } else {
      this.personalData.getData("province/all").subscribe(data => {
        this.provinces = data;
      });
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      title: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]{6,20}')]],
      province_id: ['', [Validators.required]],
      country_id: ['', [Validators.required]],
      photo: ['', [Validators.pattern(this.urlPattern)]]
    });
    this.Country_id?.valueChanges.subscribe(value => this.getData(value))
  }

  override onSubmit(): void {
    if (this.form.valid) {
      const NEWUSER = this.form.value;
      this.onUpdateItem.emit(NEWUSER);
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
  countryId: number,
  country: Country
}