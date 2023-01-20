import { Component, OnInit } from '@angular/core';
import { faCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faArrowCircleDown, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  faDownload = faArrowCircleDown;
  personalInfo:any;

  constructor(private personalData:PersonalInfoService){}

  removeAccents(str:string):string{
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 

  ngOnInit(): void {
    this.personalData.getData().subscribe(data =>{
      this.personalInfo = data;
    })
  }
}
