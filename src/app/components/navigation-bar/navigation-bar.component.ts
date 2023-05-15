import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, ViewEncapsulation } from '@angular/core';
import { faCodepen, faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBuildingColumns, faGlobe, faHashtag, faHome, faScrewdriverWrench, faShoePrints, faSuitcase, faTerminal, faUser } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface Media {
  media: string,
  url: URL
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NavigationBarComponent implements OnInit {
  navLinks = document.getElementsByClassName('nav-link');
  inverseElements = document.getElementsByClassName('inverse');
  change: boolean = false;

  @ViewChild('asNav') nav!: ElementRef;
  @ViewChild('asNavMenu') navMenu!: ElementRef;
  @ViewChild('asNavToggler') navToggler!: ElementRef;
  @ViewChild('asMediaCollapse') mediaCollapse!: ElementRef;
  @ViewChild('asMediaMenu') mediaMenu!: ElementRef;

  personalMedia!: Media[];
  faTerminal = faTerminal;
  faHome = faHome;
  faGlobe = faGlobe;
  faUser = faUser;
  faEducation = faBuildingColumns;
  faWork = faShoePrints;
  faSkills = faScrewdriverWrench;
  faProjects = faSuitcase;

  @HostListener('document:click', ['$event'])
  handleClick(event: JQuery.ClickEvent<Document, null, Document, Document>) {
    this.closeCollapse(event);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(): void {
    this.change = false;
    let navHeight = this.nav.nativeElement.clientHeight;
    for (let inverse of this.inverseElements) {
      if (window.pageYOffset >= ((inverse as HTMLElement).offsetTop) - navHeight && window.pageYOffset <= (inverse as HTMLElement).offsetTop + (inverse as HTMLElement).clientHeight - navHeight) {
        this.change = true;
      }
    }
  }

  constructor(private renderer: Renderer2, private personalData: PersonalInfoService, private router: Router, public authService: AuthService) { }

  determineIcon(media: string) {
    const MAP: any = {
      'linkedin': faLinkedin,
      'github': faGithub,
      'codepen': faCodepen,
      'instagram': faInstagram,
      'twitter': faTwitter
    };
    return MAP[media.toLowerCase().trim()] ?? faHashtag;
  }

  giveDataContent(links: HTMLCollectionOf<Element>) {
    for (let link of links) {
      link.setAttribute('data-content', link.textContent!);
    }
  }

  closeCollapse(e: JQuery.ClickEvent<Document, null, Document, Document>) {
    if (!this.mediaMenu.nativeElement.contains(e.target) && !$(e.target).is(this.mediaCollapse.nativeElement) && this.mediaCollapse.nativeElement.getAttribute('aria-expanded') === 'true' && this.mediaMenu.nativeElement.classList.contains('show')) {
      this.collapseMedia();
    }
    if (!this.nav.nativeElement.contains(e.target) && this.navToggler.nativeElement.getAttribute('aria-expanded') === 'true' && this.navMenu.nativeElement.classList.contains('show')) {
      this.collapseNav();
    }
  }

  collapseMedia() {
    (<any>$(this.mediaMenu.nativeElement)).collapse('hide');
    this.renderer.setAttribute(this.mediaCollapse.nativeElement, 'aria-expanded', 'false');
  }

  collapseNav() {
    (<any>$(this.navMenu.nativeElement)).collapse('hide');
    this.renderer.setAttribute(this.navToggler.nativeElement, 'aria-expanded', 'false');
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnInit(): void {
    this.giveDataContent(this.navLinks);

    this.personalData.getData('social/all').subscribe(data => {
      this.personalMedia = data;
    })
  }
}