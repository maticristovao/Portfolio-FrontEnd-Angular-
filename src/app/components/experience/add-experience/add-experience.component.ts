import { Component, HostListener, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import { AddItemComponent, MY_FORMATS } from '../../add-item/add-item.component';
import { Company, EmployType, Experience } from '../experience.component';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    }],
})

export class AddExperienceComponent extends AddItemComponent {
  @Input() companies: Company[] = [];
  @Input() types: EmployType[] = [];

  finishedOrCurrent(affectedControl: string, toggleRequire: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[affectedControl];
      const requireFactor = formGroup.controls[toggleRequire];
      if (control.errors && !control.errors['required']) {
        return;
      }
      if (!control.value && requireFactor.value === false) {
        control.setErrors({ required: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  get Company() {
    return this.form.get('company');
  }
  get Position() {
    return this.form.get('position');
  }
  get EmployTypeId() {
    return this.form.get('employTypeId');
  }
  get StartDate() {
    return this.form.get('startDate');
  }
  get EndDate() {
    return this.form.get('endDate');
  }
  get Current() {
    return this.form.get('current');
  }
  get Description() {
    return this.form.get('description');
  }

  override loadEditData(item: Experience) {
    this.form.setValue({
      id: item.id,
      company: item.company,
      position: item.position,
      employTypeId: item.employTypeId,
      startDate: this.extractDate(item.startDate),
      endDate: this.extractDate(item.endDate),
      current: item.current,
      description: item.description
    });
    this.add = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        id: undefined,
        company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        position: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        employTypeId: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: [{ value: '', disabled: false }, []],
        current: [false, []],
        description: ['', [Validators.required]]
      },
      {
        validators: [this.finishedOrCurrent('endDate', 'current'), this.endAfter('startDate', 'endDate')]
      }
    );

    this.initialValue = this.form.value;
    this.Current!.valueChanges.subscribe(value => {
      if (value) {
        this.EndDate!.disable();
      } else {
        this.EndDate!.enable();
      }
    })
  }
}