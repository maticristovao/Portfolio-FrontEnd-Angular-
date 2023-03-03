import { Component, OnInit, ViewChild } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FileInput } from 'ngx-material-file-input';
import { Section } from 'src/assets/section';
import { AddPersonalInfoComponent } from './add-personal-info/add-personal-info.component';
import { Phone } from './contact-modal/contact-modal.component';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent extends Section implements OnInit {
  @ViewChild(AddPersonalInfoComponent) editModal!: AddPersonalInfoComponent;

  moreContent!: string;
  personalInfo: UserData | undefined;
  phones!: Phone[];
  override field = 'user/1';
  override campo = 'Información personal';
  photo: string = '';

  faLocationDot = faLocationDot;

  override toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
    this.editModal.loadEditData(this.personalInfo!);
  }

  save(item: any) {
    this.personalData.patchItem(item, this.field).subscribe((user) => {
      this.personalInfo = user;
      this.showSuccess('edit');
    });
  }

  getData(): void {
    this.personalData.getData(`${this.field}?_embed=phones`).subscribe((user: UserData) => {
      this.personalInfo = user;
      this.phones = user.phones!;
      // this.cargarFoto(user.photo);  
    });
  }

  // cargarFoto(foto: FileInput) { 
  //   console.log(foto);
  //   const ARCHIVO: File = foto.files[0]; 
  //   if (ARCHIVO) { 
  //     const LECTOR: FileReader = new FileReader();
  //     LECTOR.readAsDataURL(ARCHIVO);
  //     LECTOR.onload = () => { 
  //       this.photo = LECTOR.result as string;
  //     };
  //   }
  //   console.log(this.photo);
  // }
}

export interface UserData {
  name: string,
  surname: string,
  title: string[],
  email: string,
  phones?: Phone[],
  province: string,
  country: string,
  photo: any
}