import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PersonalInfoService } from './personal-info.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public showAbout: boolean = true;
  public showEducation: boolean = true;
  public showExperience: boolean = true;
  public showSkills: boolean = true;
  public showLanguages: boolean = true;
  public showProjects: boolean = true;

  private subject = new Subject<any>();

  constructor(private personalDataService: PersonalInfoService) {
    this.personalDataService.getData('user/1').subscribe(user => {
      this.showAbout = user.showAbout;
      this.showEducation = user.showEdu;
      this.showExperience = user.showExp;
      this.showSkills = user.showSkills;
      this.showProjects = user.showProj;
    })
  }

  toggleSection(section: string): void {
    switch (section) {
      case 'about':
        this.showAbout = !this.showAbout;
        this.subject.next(this.showAbout);
        break;
      case 'education':
        this.showEducation = !this.showEducation;
        this.subject.next(this.showEducation);
        break;
      case 'experience':
        this.showExperience = !this.showExperience;
        this.subject.next(this.showExperience);
        break;
      case 'skills':
        this.showSkills = !this.showSkills;
        this.subject.next(this.showSkills);
        break;
      case 'languages':
        this.showLanguages = !this.showLanguages;
        this.subject.next(this.showLanguages);
        break;
      case 'projects':
        this.showProjects = !this.showProjects;
        this.subject.next(this.showProjects);
        break;
      default:
        console.error('Section not found');
        break;
    }
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
