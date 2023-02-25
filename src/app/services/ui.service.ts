import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAbout: boolean = true;
  private showEducation: boolean = true;
  private showExperience: boolean = true;
  private showSkills: boolean = true;
  private showLanguages: boolean = true;
  private showProjects: boolean = true;

  private subject = new Subject<any>();

  constructor() { }

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
