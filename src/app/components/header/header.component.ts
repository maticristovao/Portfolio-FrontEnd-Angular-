import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:resize')
  @HostListener('window:resize')
  onResize() {
    this.defineName();
    this.defineSurname();
  }

  constructor(private personalData:PersonalInfoService){
  }

  removeAccents(str:string):string{
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  defineName(){
    if(window.innerWidth>1000){
      return this.removeAccents(this.personalInfo.name)
    }else{
      return this.removeAccents(this.personalInfo.name)[0];
    }
  }

  defineSurname(){
    if(window.innerWidth>=730){
      return this.removeAccents(this.personalInfo.surname)
    }else{
      return this.removeAccents(this.personalInfo.surname)[0];
    }
  }

  ngOnInit(): void {
    this.personalData.getData().subscribe(data =>{
      this.personalInfo = data;
    })
    this.defineName();
    this.defineSurname();
  }
}
