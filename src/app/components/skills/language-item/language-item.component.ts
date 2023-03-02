import { Component, Input } from '@angular/core';
import { faFeather, faLanguage, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../skills.component';

@Component({
  selector: 'app-language-item',
  templateUrl: './language-item.component.html',
  styleUrls: ['./language-item.component.css']
})
export class LanguageItemComponent {
  @Input() language!: Language;

  faOral = faVolumeHigh;
  faWritten = faFeather;
  faLanguage = faLanguage;
}