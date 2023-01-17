import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/Person';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{
  @ViewChild('asMore') more!:ElementRef;
  moreContent!:string;
  personalInfo!:any;

  faLocationDot = faLocationDot;

  @HostListener('window:resize')
  onResize() {
    this.defineContent();
  }

  constructor(private personalData:PersonalInfoService){
    this.defineContent();
  }

  defineContent(){
    if(window.innerWidth>=1200){
      this.moreContent = 'More';
    }else{
      this.moreContent = '...';
    }
  }

  ngOnInit(): void {
    this.personalData.getData().subscribe(data => {
      this.personalInfo = data;
    });
  }
}