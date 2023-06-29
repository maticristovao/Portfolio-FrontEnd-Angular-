import { AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PersonalInfoService } from './services/personal-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'my-portfolio';

  @HostListener('window:load', ['$event'])
  onWindowLoad(event: Event) {
    window.scrollTo(0, 0);
  }
}
