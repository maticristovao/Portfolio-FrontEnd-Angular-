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
import { MainComponent } from './components/main/main.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectItemComponent } from './components/projects/project-item/project-item.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DatePipe } from '@angular/common';
import { EditItemComponent } from './components/edit-item/edit-item.component';


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
    LoginComponent,
    MainComponent,
    LoginFormComponent,
    ProjectItemComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
