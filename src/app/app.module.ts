import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElementObserverDirective } from './components/element-observer.directive';
import { SkillItemComponent } from './components/skill-item/skill-item.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectsComponent } from './components/projects/projects.component';
import { EditionComponent } from './components/edition/edition.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HeaderComponent,
    PersonalInfoComponent,
    ContactModalComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ElementObserverDirective,
    SkillItemComponent,
    LanguagesComponent,
    ProjectsComponent,
    EditionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
