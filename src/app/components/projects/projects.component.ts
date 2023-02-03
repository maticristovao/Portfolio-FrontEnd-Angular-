import { Component, OnInit } from '@angular/core';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  projects:any;
  faCode = faCode;
  faCodePen = faCodepen;

  constructor(private personalData:PersonalInfoService){}

  toggleVisibility(){
    console.log('messi');
    $(this).addClass('visible');
    console.log($(this));
  }

  ngOnInit(): void {
    this.personalData.getData().subscribe(data =>{
      this.projects = data.projects;
    })
  }
}
