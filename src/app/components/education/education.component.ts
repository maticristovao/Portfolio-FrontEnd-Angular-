import { AfterViewChecked, Component, ViewChild } from '@angular/core';
import { faUserGraduate, faLaptopCode, faBook, faRadio, faFlask, faDumbbell, faGears, faLandmarkDome, faHeartPulse, faChurch, faCommentsDollar, faScaleBalanced, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Section } from 'src/assets/section';
import { AddEducationComponent } from './add-education/add-education.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent extends Section implements AfterViewChecked {
  personalEducation!: Education[];
  override field = 'education';
  override campo = 'Estudios';
  institutions: Institution[] = [];
  areas: Area[] = [];

  @ViewChild(AddEducationComponent) override editModal!: AddEducationComponent;

  setActive(): void {
    if (window.innerWidth <= 576) return;
    for (let card of $('.education-card')) {
      card.classList.remove('active');
    }
    $(this).addClass('active');
  }

  determineIcon(id: number): IconDefinition {
    const MAP: any = {
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
    return MAP[id] ?? faBook;
  }

  addItem(item: Education): void {
    this.personalData.addItem(item, this.field).subscribe((card) => {
      this.appendRelations(card)
      this.personalEducation.push(card);
      this.setActive();
      setTimeout(() => this.getCards().item(this.getCardPosition(card))!.className += ' active', 10);
      this.showSuccess('add');
    });
  }

  appendRelations(item: Education): void {
    let inst = this.institutions.find((i: Institution) => i.id === item.institutionId);
    item.institution = inst;
    let area = this.institutions.find((a: Area) => a.id === item.areaId);
    item.area = area;
  }

  save(item: Education): void {
    this.personalData.updateItem(item, this.field).subscribe(() => {
      this.getCards().item(this.getCardPosition(item))!.className += ' active';
      this.showSuccess('edit');
    });
    this.appendRelations(item);
    this.personalEducation[this.getCardPosition(item)] = item;
  }

  deleteItem(item: Education): void {
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

  getData(): void {
    this.personalData.newGetData(`${this.field}/all`).subscribe(data => {
      this.personalEducation = data;
    })
    this.personalData.newGetData('institution/all').subscribe(data => {
      this.institutions = data;
    });
    this.personalData.newGetData('area/all').subscribe(data => {
      this.areas = data;
    });
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