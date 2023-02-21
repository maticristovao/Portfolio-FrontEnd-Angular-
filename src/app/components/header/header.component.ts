import { AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { NgbCarousel, NgbCarouselConfig, NgbSlide, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('asCarousel') carousel!: NgbCarousel;
  intersecting = false;
  faDownload = faArrowCircleDown;
  personalInfo!: any;
  name!: string;
  surname!: string;
  images: string[] = [
    'https://elceo.com/wp-content/uploads/2021/10/mexico-economia-av.jpg',
    'https://www.fundacionaquae.org/wp-content/uploads/2020/04/Nuevas-formas-de-trabajo3-1-002.jpg',
    'https://a.storyblok.com/f/112937/568x400/19b8611e4b/10-most-fun-languages-to-learn_square-568x400.jpg/m/620x0/filters:quality(70)/'
  ]

  @HostListener('window:resize')
  onResize() {
    this.defineName();
    this.defineSurname();
  }

  constructor(private personalData: PersonalInfoService, private config: NgbCarouselConfig) {
    this.config.interval = 6000;
    this.config.pauseOnHover = false;
    this.config.keyboard = false;
    this.config.showNavigationArrows = false;
    this.config.animation = false
    this.config.pauseOnFocus = false;
  }

  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  defineName() {
    if (window.innerWidth > 1025) {
      this.name = this.removeAccents(this.personalInfo.name)
    } else {
      this.name = this.removeAccents(this.personalInfo.name)[0];
    }
  }

  defineSurname() {
    if (window.innerWidth > 737) {
      this.surname = this.removeAccents(this.personalInfo.surname)
    } else {
      this.surname = this.removeAccents(this.personalInfo.surname)[0];
    }
  }

  resetTimer(e: NgbSlideEvent) {
    if (e.source !== 'timer') {
      this.carousel.pause();
      this.carousel.cycle();
    }
  }

  ngOnInit(): void {
    this.personalData.getData('user').subscribe(data => {
      this.personalInfo = data;
    })

  }
  ngAfterViewInit(): void {
    this.defineName();
    this.defineSurname();
  }
}