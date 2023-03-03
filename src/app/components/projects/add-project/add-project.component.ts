import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddItemComponent } from '../../add-item/add-item.component';
import { Project } from '../projects.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent extends AddItemComponent implements OnInit {
  get Title() {
    return this.form.get('title');
  }
  get Repo() {
    return this.form.get('repo');
  }
  get Link() {
    return this.form.get('link');
  }
  get Collection() {
    return this.form.get('collection');
  }
  get Image() {
    return this.form.get('image');
  }
  get Description() {
    return this.form.get('description');
  }

  override loadEditData(item: Project) {
    this.form.setValue({
      id: item.id,
      title: item.title,
      repo: item.repo,
      link: item.link,
      collection: item.collection,
      image: item.image,
      description: item.description
    });
    this.add = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: undefined,
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      repo: ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      link: ['', [Validators.pattern(this.urlPattern)]],
      collection: ['', [Validators.pattern(this.urlPattern)]],
      image: [],
      description: ['', [Validators.required]]
    })
  }
}