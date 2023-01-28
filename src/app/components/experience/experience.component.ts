import { Component, HostListener, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit{
  personalExperience:any;
  intersecting:boolean = false;
  windowWidth:number = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }

  constructor(private personalData:PersonalInfoService){}

  isIntersecting(){
    this.intersecting = true;
  }

  ngOnInit(): void {
    this.personalData.getData().subscribe(data => {
      this.personalExperience = data.experience;
    })
  }
}
