import { AfterViewChecked, AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { faCoins, faUserGraduate, faLaptopCode, faBook } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, AfterViewChecked{
  personalEducation!:any;
  windowWidth = window.innerWidth;
  editMode:boolean = false;

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

  determineIcon(area:string){
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
      this.personalData.addItem(item, 'education').subscribe((item)=>{
      this.personalEducation.push(item);
    })
  }

  deleteItem(item:any){
    this.personalData.deleteItem(item, 'education').subscribe(()=>{
      this.personalEducation = this.personalEducation.filter((i: { id: any; }) => i.id !== item.id);
    })
    let first = document.querySelector('.education-card');
    first?.classList.add('active');
  }

  edit(){
    this.editMode = !this.editMode;
  }

  ngOnInit(): void {
    this.personalData.getData('education').subscribe(data => {
      this.personalEducation = data;
    });
  }

  ngAfterViewChecked():void{
    $('.education-card').on('click', this.setActive);
  }
}

interface Education{
  institution:string,
  title:string,
  startDate:string | number,
  endDate?:string | number,
  area:string,
  logo?:string
}