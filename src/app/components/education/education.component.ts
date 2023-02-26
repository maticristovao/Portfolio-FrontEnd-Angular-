import { AfterViewChecked, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { faUserGraduate, faLaptopCode, faBook, faRadio, faFlask, faDumbbell, faGears, faLandmarkDome, faHeartPulse, faChurch, faCommentsDollar, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddEducationComponent } from './add-education/add-education.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, AfterViewChecked {
  personalEducation!: Education[];
  windowWidth = window.innerWidth;
  editMode: boolean = false;
  update: boolean = false;
  visible: boolean = false;
  field: string = 'education';
  institutions: Institution[] = [];
  areas: Area[] = [];

  @ViewChild(AddEducationComponent) editModal!: AddEducationComponent;

  @HostListener('window:resize')
  onResize(): void {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData: PersonalInfoService, private toastService: ToastrService) { }

  setActive() {
    if (window.innerWidth <= 576) return;
    for (let card of $('.education-card')) {
      card.classList.remove('active');
    }
    $(this).addClass('active');
  }

  determineIcon(id: number) {
    const map: any = {
      1: faCommentsDollar,
      2: faLaptopCode,
      3: faUserGraduate,
      4: faRadio,
      5: faFlask,
      6: faDumbbell,
      7: faGears,
      8: faLandmarkDome,
      9: faHeartPulse,
      10: faScaleBalanced,
      11: faChurch
    };
    return map[id] ?? faBook;
  }

  addItem(item: Education) {
    this.personalData.addItem(item, this.field).subscribe((card) => {
      this.appendRelations(card)
      this.personalEducation.push(card);
      this.setActive();
      setTimeout(() => this.getCards().item(this.getCardPosition(card))!.className += ' active', 10);
      this.showSuccess('add');
    });
  }

  appendRelations(item: Education) {
    let inst = this.institutions.find((i: Institution) => i.id === item.institutionId);
    item.institution = inst;
    let area = this.institutions.find((a: Area) => a.id === item.areaId);
    item.area = area;
  }

  save(item: Education) {
    this.personalData.updateItem(item, this.field).subscribe(() => {
      this.getCards().item(this.getCardPosition(item))!.className += ' active';
      this.showSuccess('edit');
    });
    this.appendRelations(item);
    this.personalEducation[this.getCardPosition(item)] = item;
  }

  deleteItem(item: Education) {
    this.personalData.deleteItem(item, this.field).subscribe(() => {
      this.getCards().item(this.getCardPosition(item) > 0 ? (this.getCardPosition(item) - 1) : 1)!.className += ' active';
      this.personalEducation = this.personalEducation.filter(i => i.id !== item.id);
      this.showDelete();
    });
  }

  getCardPosition(item: Education): number {
    let chosenCard = this.personalEducation.find(card => card.id === item.id)
    let position = this.personalEducation.indexOf(chosenCard!);
    return position;
  }

  getCards(): HTMLCollectionOf<Element> {
    let cards = document.getElementsByClassName('education-card');
    return cards;
  }

  toggleModal() {
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  passData(card: any) {
    this.toggleModal();
    this.editModal.loadEditData(card);
  }

  ngOnInit(): void {
    this.personalData.getData(`${this.field}?_expand=institution&_expand=area`).subscribe(data => {
      this.personalEducation = data;
    })
    this.personalData.getData('institutions?_sort=name&_order=asc').subscribe(data => {
      this.institutions = data;
    });
    this.personalData.getData('areas?_sort=name&_order=asc').subscribe(data => {
      this.areas = data;
    });
  }

  showSuccess(type: 'add' | 'edit') {
    if (type === 'add') {
      this.toastService.success('Ítem añadido correctamente', 'Estudios');
    } else {
      this.toastService.success('Cambios guardados', 'Estudios');
    }
  }

  showDelete() {
    this.toastService.error('ítem eliminado', 'Estudios');
  }

  ngAfterViewChecked(): void {
    $('.education-card').on('click', this.setActive);
  }
}

export interface Education {
  id?: number
  title: string,
  institutionId: number,
  institution?: Institution,
  areaId: number,
  area?: Area,
  startDate: string | Date,
  endDate: string | Date,
}

export interface Institution {
  id: number,
  name: string
  logo?: string
}

export interface Area {
  id: number,
  name: string
}