import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  about!:string;
  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void {
    this.personalData.getData().subscribe(data =>{
      this.about = data.about;
    })
  }
  
}
