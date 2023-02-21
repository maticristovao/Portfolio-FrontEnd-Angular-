import { Component, Input } from '@angular/core';
import { faFeather, faLanguage, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../skills.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {
  @Input() language!: Language;

  faOral = faVolumeHigh;
  faWritten = faFeather;
  faLanguage = faLanguage;
}