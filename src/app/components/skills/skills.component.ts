import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  personalInfo:any;

  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void {
    this.personalData.getData().subscribe(data => {
      this.personalInfo = data;
    });
  }
}
