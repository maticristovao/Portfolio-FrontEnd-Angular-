import { Component, Input } from '@angular/core';
import { faFeather, faLanguage, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

export interface Language{
  name:string,
  oral:string,
  written:string
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {
  @Input() language!:Language;

  faOral = faVolumeHigh;
  faWritten = faFeather;
  faLanguage = faLanguage;
}
