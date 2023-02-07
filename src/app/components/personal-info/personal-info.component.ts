import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{
  @ViewChild('asMore') more!:ElementRef;
  moreContent!:string;
  personalInfo:any;
  windowWidth:number = window.innerWidth;
  phone:any;

  faLocationDot = faLocationDot;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void {
    this.personalData.getData('user').subscribe(data => {
      this.personalInfo = data;
    });
    this.personalData.getData('phone').subscribe(data => {
      this.phone = data;
    });
  }
}