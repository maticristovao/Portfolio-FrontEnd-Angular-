import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { faLanguage, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { AddItemComponent } from '../../add-item/add-item.component';
import { Language, Level, Skill } from '../skills.component';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent extends AddItemComponent implements OnInit {
  isSkillEdit!: boolean;
  faSkill = faScrewdriverWrench;
  faLanguage = faLanguage;
  @Input() levels: Level[] = [];

  skillForm: FormGroup = this.formBuilder.group({
    id: undefined,
    name: ['', [Validators.required, Validators.maxLength(30)]],
    progress: [0, [Validators.required]]
  });
  langForm: FormGroup = this.formBuilder.group({
    id: undefined,
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

  override reset(): void {
    this.langForm.reset(this.initialValue);
    this.skillForm.reset(this.initialValue);
    this.add = true;
  }

  loadSkill(skill: Skill) {
    this.isSkillEdit = true;
    this.skillForm.setValue({
      id: skill.id,
      name: skill.name,
      progress: skill.progress
    });
    this.add = false;
  }

  loadLanguage(language: Language) {
    this.isSkillEdit = false;
    this.langForm.setValue({
      id: language.id,
      name: language.name,
      oral: language.oralLevel.id,
      written: language.writtenLevel.id
    });
    this.add = false;
  }

  submitForm(type: 'skill' | 'language') {
    if (type === 'skill') {
      this.form = this.skillForm;
    } else {
      this.form = this.langForm;
    }
    this.onSubmit();
  }

  ngOnInit(): void {
    this.form = this.langForm || this.skillForm;
  }
}