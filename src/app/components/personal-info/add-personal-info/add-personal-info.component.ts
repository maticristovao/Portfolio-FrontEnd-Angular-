import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../add-item/add-item.component';

@Component({
  selector: 'app-add-personal-info',
  templateUrl: './add-personal-info.component.html',
  styleUrls: ['./add-personal-info.component.css']
})
export class AddPersonalInfoComponent extends AddItemComponent implements OnInit{

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

  ngOnInit():void{
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      surname: ['', [Validators.required]],
      title:[[], [Validators.required]],
      province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      photo: ['', []]
    })
  }
}