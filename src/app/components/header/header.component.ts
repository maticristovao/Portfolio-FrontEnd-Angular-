import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { NgbCarousel, NgbCarouselConfig, NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { Section } from 'src/assets/section';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent extends Section {
  @ViewChild('asCarousel') carousel!: NgbCarousel;
  faDownload = faArrowCircleDown;
  name: string = '';
  surname: string = '';
  images: string[] = [
    'https://elceo.com/wp-content/uploads/2021/10/mexico-economia-av.jpg',
    'https://www.fundacionaquae.org/wp-content/uploads/2020/04/Nuevas-formas-de-trabajo3-1-002.jpg',
    'https://a.storyblok.com/f/112937/568x400/19b8611e4b/10-most-fun-languages-to-learn_square-568x400.jpg/m/620x0/filters:quality(70)/'
  ];
  editModal: any;

  constructor(personalData: PersonalInfoService, toastService: ToastrService, auth: AuthService, private config: NgbCarouselConfig) {
    super(personalData, toastService, auth);
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

  resetTimer(e: NgbSlideEvent) {
    if (e.source !== 'timer') {
      this.carousel.pause();
      this.carousel.cycle();
    }
  }

  getData() {
    this.personalData.startLoader();
    this.personalData.getData('user/1').subscribe(data => {
      this.name = data.name;
      this.surname = data.surname;
      this.personalData.hideLoader();
    });
    this.personalData.RefreshRequired.subscribe(() => this.getData());
  }
}