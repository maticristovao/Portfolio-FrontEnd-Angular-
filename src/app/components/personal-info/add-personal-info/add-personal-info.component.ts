import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../add-item/add-item.component';
import {COMMA, ENTER, DASH, SLASH} from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { UserData } from '../personal-info.component';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-personal-info',
  templateUrl: './add-personal-info.component.html',
  styleUrls: ['./add-personal-info.component.css']
})
export class AddPersonalInfoComponent extends AddItemComponent implements OnInit{
  readonly separatorKeysCodes = [ENTER, COMMA, DASH, SLASH] as const;
  titles:string[] = [];
  countries:Country[] = [];
  provinces:Province[] = [];
  faFolder = faFolder;

  get Name(){
    return this.form.get('name');
  }
  get Surname(){
    return this.form.get('surname');
  }
  get Title(){
    return this.form.get('title');
  }
  get Province(){
    return this.form.get('province');
  }
  get Country(){
    return this.form.get('country');
  }
  get Photo(){
    return this.form.get('photo');
  }

  added(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.titles.push(value);
    }
    event.chipInput!.clear();
  }

  remove(title:string): void {
    const index = this.titles.indexOf(title);

    if (index >= 0) {
      this.titles.splice(index, 1);
    }
  }

  edit(title:string, event: MatChipEditedEvent) {
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

  loadEditData(user:UserData){
    this.form.setValue({
      name: user.name,
      surname: user.surname,
      title: user.title,
      province: user.province,
      country: user.country,
      photo: user.photo
    })
    this.titles = [];
    user.title.forEach(title => this.titles.push(title));
  }

  getData(field:string, property:any){
    this.personalData.getData(field).subscribe(data=> {
      property = data;
    });
  }

  ngOnInit():void{
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      surname: ['', [Validators.required]],
      title:[this.titles, [Validators.required, Validators.maxLength(2)]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      photo: ['', []]
    });
  }

  override onSubmit():void{
    if(this.form.valid){
      const newItem = this.form.value;
      console.log(newItem.photo);
      this.onUpdateItem.emit(newItem);
      this.close();
    }else{
      this.form.markAllAsTouched();
    }
  }
}

export interface Country{
  id: number,
  name:string
}

export interface Province{
  id:number,
  name:string,
  countryId: number
}