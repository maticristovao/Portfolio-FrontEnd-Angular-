import { Component, ElementRef, OnInit, Renderer2, ViewChildren } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
  education!:any;

  
  constructor(private personalData:PersonalInfoService){
    
  }
  removeActive(){
    
  }

  setActive(){
    for(let card of $('.education-card')){
      card.classList.remove('active');
    }
    
    $(this).addClass('active');
    
  }

  ngOnInit(): void {
    $('.education-card').on('click', this.setActive);

    this.personalData.getData().subscribe(data =>{
      this.education = data.education;
    })
    console.log(this.education);
  }
}
