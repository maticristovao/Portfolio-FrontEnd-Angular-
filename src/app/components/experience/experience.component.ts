import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit{
  personalExperience:any;

  constructor(private personalData:PersonalInfoService){}

  ngOnInit(): void {
    this.personalData.getData().subscribe(data => {
      this.personalExperience = data.experience;
    })
  }
}
