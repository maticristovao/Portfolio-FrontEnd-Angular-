import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Area, Education, Institution } from '../education.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { AddItemComponent, MY_FORMATS } from '../../add-item/add-item.component';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }],
  encapsulation: ViewEncapsulation.None
})

export class AddEducationComponent extends AddItemComponent implements OnInit {
  @Input() institutions: Institution[] = [];
  @Input() areas: Area[] = [];

  get Title() {
    return this.form.get('title');
  }
  get Institution_id() {
    return this.form.get('institution_id');
  }
  get Area_id() {
    return this.form.get('area_id');
  }
  get StartDate() {
    return this.form.get('startDate');
  }
  get EndDate() {
    return this.form.get('endDate');
  }

  override loadEditData(card: Education) {
    this.form.setValue({
      id: card.id,
      title: card.title,
      institution_id: card.institution?.id,
      area_id: card.area?.id,
      startDate: this.extractDate(card.startDate),
      endDate: this.extractDate(card.endDate)
    })
    this.add = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: undefined,
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      institution_id: ['', [Validators.required]],
      area_id: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    },
      {
        validators: [this.endAfter('startDate', 'endDate')]
      });
    this.initialValue = this.form.value;
  }
}