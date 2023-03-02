import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Section } from 'src/assets/section';
import { EditAboutComponent } from './edit-about/edit-about.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends Section {
  about!: string;
  flip: boolean = false;
  override campo = 'Acerca de mí';
  override field = 'user/1';
  // showAbout:boolean = true;
  // subscription?: Subscription;

  @ViewChild(EditAboutComponent) editModal!: EditAboutComponent;

  override toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
    this.editModal.loadEditData(this.about);
    console.log('done');
  }

  save(about: string) {
    this.personalData.patchItem(about, this.field).subscribe((newUser) => {
      this.about = newUser.about;
      this.showSuccess('edit');
    });
  }

  // discardSection(){
  //   this.uiService.toggleSection('about');
  // }

  // constructor(private uiService: UiService) {
  //   this.subscription = this.uiService.onToggle().subscribe(value => this.showAbout = value);
  // }
  getData(){
    this.personalData.getData(this.field).subscribe(data => {
      this.about = data.about;
    });
  }
}
