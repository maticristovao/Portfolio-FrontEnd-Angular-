import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalInfoComponent } from './add-personal-info.component';

describe('AddPersonalInfoComponent', () => {
  let component: AddPersonalInfoComponent;
  let fixture: ComponentFixture<AddPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
