import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faLanguage, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { AddItemComponent } from '../../add-item/add-item.component';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent extends AddItemComponent implements OnInit{
  faSkill = faScrewdriverWrench;
  faLanguage = faLanguage;

  formatLabel(value: number):string {
    return `${value}%`;
  }

  get Progress(){
    return this.form.get('progress');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', [Validators.required, Validators.maxLength(15)]],
      progress:[0, [Validators.required]]
    });
  }
}
