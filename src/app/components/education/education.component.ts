import { AfterViewChecked, AfterViewInit, Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faCoins, faUserGraduate, faLaptopCode, faBook } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, AfterViewChecked{
  personalEducation!:Education[];
  windowWidth = window.innerWidth;
  editMode:boolean = false;
  update:boolean = false;

  @ViewChild(AddItemComponent) editModal!:AddItemComponent;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService, private renderer:Renderer2){}

  getEducation(){
    this.personalData.getData('education').subscribe(data =>{
      this.personalEducation = data;
    })
  }

  setActive(){
    if(window.innerWidth <= 576) return;
    for(let card of $('.education-card')){
      card.classList.remove('active');
    }
    $(this).addClass('active');
  }

  determineIcon(area:string | undefined){
    if(!area){return faBook};
    switch (area.toLowerCase().trim()){
      case "economics":
        return faCoins;

      case "programming":
        return faLaptopCode;

      case "school":
        return faUserGraduate;

      default:
        return faBook;
    }
  }

  addItem(item:Education){
    this.personalData.addItem(item, 'education').subscribe(()=>{
      this.getEducation();
    });
  }

  save(item:Education){
    this.personalEducation[this.getCardPosition(item)] = item;
    this.personalData.updateItem(item, 'education').subscribe(()=>{
      this.getCards().item(this.getCardPosition(item))!.className += ' active';
    });
  }

  deleteItem(item:Education){
    console.log(item.id);
    this.personalData.deleteItem(item, 'education').subscribe(()=>{
      this.getCards().item(this.getCardPosition(item) - 1)!.className += ' active';
      this.personalEducation = this.personalEducation.filter(i => i.id !== item.id);
    });
  }

  getCardPosition(item:Education):number{
    let chosenCard = this.personalEducation.find(card => card.id===item.id)
    let position = this.personalEducation.indexOf(chosenCard!);
    return position;
  }
  
  getCards():HTMLCollectionOf<Element>{
    let cards = document.getElementsByClassName('education-card');
    return cards;
  }

  edit(){
    this.editMode = !this.editMode;
  }
  toggleModal(){
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }
  passData(card:any){
    this.toggleModal()
    this.editModal.loadEditData(card);
  }

  ngOnInit(): void {
    this.getEducation();
  }

  ngAfterViewChecked():void{
    $('.education-card').on('click', this.setActive);
  }
}

export interface Education{
  institution:string,
  title:string,
  startDate:string | number,
  endDate?:string | number,
  area:string,
  logo?:string,
  id?:number
}