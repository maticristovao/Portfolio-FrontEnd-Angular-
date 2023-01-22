import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { faCoins, faUserGraduate, faLaptopCode, faBook } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, AfterViewInit{
  personalInfo!:any;
  windowWidth = window.innerWidth;
  firstCard!:Element | null;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
    this.setActive();
    this.firstCard!.classList.add('active');
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


  ngOnInit(): void {
    this.personalData.getData().subscribe(data => {
      this.personalInfo = data;
    });
  }

  ngAfterViewInit(): void {
    this.firstCard = document.querySelector('.education-card');
    this.firstCard!.classList.add('active');
    $('.education-card').on('click', this.setActive);
  }
}
