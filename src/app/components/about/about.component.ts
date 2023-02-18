import { Component, HostListener, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  about!:string;
  existence:boolean=true;
  windowWidth:number = window.innerWidth;
  editing:boolean = false;
  flip:boolean = false;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
  }
  
  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void {
    this.personalData.getData('user').subscribe(data =>{
      this.about = data.about;
    })
  }
}
