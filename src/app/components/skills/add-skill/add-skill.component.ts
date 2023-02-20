import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
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
  levels = ['Básico', 'Intermedio', 'Avanzado', 'Bilingüe'];

  skillForm: FormGroup = this.formBuilder.group({
    id:undefined,
    name: ['', [Validators.required, Validators.maxLength(15)]],
    progress: [0, [Validators.required]]
  });
  langForm: FormGroup = this.formBuilder.group({
    id:undefined,
    name: ['', [Validators.required]],
    oral: ['', [Validators.required]],
    written: ['', [Validators.required]]
  })
  

  formatLabel(value: number): string {
    return `${value}%`;
  }

  get SkillName() {
    return this.skillForm.get('name');
  }
  get Progress() {
    return this.skillForm.get('progress');
  }
  get LangName() {
    return this.langForm.get('name');
  }
  get Oral() {
    return this.langForm.get('oral');
  }
  get Written() {
    return this.langForm.get('written');
  }

  override reset(): void {
    this.langForm.reset(this.initialValue);
    this.skillForm.reset(this.initialValue);
    this.add = true;
  }

  submitForm(isSkill:boolean){
    if(isSkill){
      this.form = this.skillForm;
    }else{
      this.form = this.langForm;
    }
    this.onSubmit();
  }

  ngOnInit(): void {
    this.form = this.langForm || this.skillForm;
  }
}
