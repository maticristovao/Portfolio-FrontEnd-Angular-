import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faCoins, faUserGraduate, faLaptopCode, faBook } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, AfterViewInit{
  personalInfo!:any;

  
  constructor(private personalData:PersonalInfoService){}


  setActive(){
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
    $('.education-card').on('click', this.setActive);
  }
}
