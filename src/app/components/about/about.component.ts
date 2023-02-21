import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { EditAboutComponent } from './edit-about/edit-about.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  about!: string;
  existence: boolean = true;
  windowWidth: number = window.innerWidth;
  flip: boolean = false;
  editing: boolean = false;
  field: string = 'user'

  @ViewChild(EditAboutComponent) editModal!: EditAboutComponent;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
    this.editModal.loadEditData(this.about);
  }

  save(about: string) {
    this.personalData.patchItem(about, this.field).subscribe((newUser) => {
      this.about = newUser.about;
    });
  }

  constructor(private personalData: PersonalInfoService) { }

  ngOnInit(): void {
    this.personalData.getData(this.field).subscribe(data => {
      this.about = data.about;
    })
  }
}
