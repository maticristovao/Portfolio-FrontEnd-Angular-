import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactModalComponent } from './components/personal-info/contact-modal/contact-modal.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ElementObserverDirective } from './components/element-observer.directive';
import { SkillItemComponent } from './components/skills/skill-item/skill-item.component';
import { LanguagesComponent } from './components/skills/languages/languages.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EditionComponent } from './components/edition/edition.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectItemComponent } from './components/projects/project-item/project-item.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddItemComponent } from './components/add-item/add-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddPersonalInfoComponent } from './components/personal-info/add-personal-info/add-personal-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AddSkillComponent } from './components/skills/add-skill/add-skill.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';



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
    AddEducationComponent,
    EditItemComponent,
    AddExperienceComponent,
    AddItemComponent,
    AddPersonalInfoComponent,
    AddSkillComponent,
    AddProjectComponent,
    EditAboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    DragDropModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatChipsModule,
    MaterialFileInputModule,
    MatTabsModule,
    MatSliderModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
