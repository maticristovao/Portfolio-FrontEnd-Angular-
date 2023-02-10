import { AfterViewChecked, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { faCoins, faUserGraduate, faLaptopCode, faBook } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { AddEducationComponent } from './add-education/add-education.component';

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
  visible:boolean = false;
  field:string = 'education';

  @ViewChild(AddEducationComponent) editModal!:AddEducationComponent;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService){}

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
    this.personalData.addItem(item, this.field).subscribe((card)=>{
      this.personalEducation.push(card);
      this.setActive();
      setTimeout(()=>this.getCards().item(this.getCardPosition(card))!.className += ' active', 10);
    });
  }

  save(item:Education){
    this.personalEducation[this.getCardPosition(item)] = item;
    this.personalData.updateItem(item, this.field).subscribe(()=>{
      this.getCards().item(this.getCardPosition(item))!.className += ' active';
    });
  }

  deleteItem(item:Education){
    this.personalData.deleteItem(item, this.field).subscribe(()=>{
      this.getCards().item(this.getCardPosition(item)>0? (this.getCardPosition(item) - 1):1)!.className += ' active';
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

  toggleModal(){
    this.editModal.reset();
    this.editModal.open(this.editModal.myModal);
  }

  passData(card:any){
    this.toggleModal();
    this.editModal.loadEditData(card);
  }

  ngOnInit(): void {
    this.personalData.getData(this.field).subscribe(data =>{
      this.personalEducation = data;
    })
  }

  ngAfterViewChecked():void{
    $('.education-card').on('click', this.setActive);
  }
}

export interface Education{
  institution:string,
  title:string,
  startDate:string | Date,
  endDate?:string | Date,
  area:string,
  logo?:string,
  id?:number
}