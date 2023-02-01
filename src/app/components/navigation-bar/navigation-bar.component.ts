import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { faCodepen, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBuildingColumns, faGlobe, faHashtag, faHome, faPersonDigging, faScrewdriverWrench, faShoePrints, faSuitcase, faTerminal, faUser } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { Router } from '@angular/router';

export interface Media{
  media:string,
  url:URL
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})

export class NavigationBarComponent implements OnInit, AfterViewInit {
  navLinks = document.getElementsByClassName('nav-link');
  inverseElements = document.getElementsByClassName('inverse');
  change:boolean = false;

  @ViewChild('asNav') nav!:ElementRef;
  @ViewChild('asNavMenu') navMenu!:ElementRef;
  @ViewChild('asNavToggler') navToggler!:ElementRef;
  @ViewChild('asMediaCollapse') mediaCollapse!:ElementRef;
  @ViewChild('asMediaMenu') mediaMenu!:ElementRef;

  personalMedia!:Media[];
  faTerminal = faTerminal;
  faHome = faHome;
  faGlobe = faGlobe;
  faUser = faUser;
  faEducation = faBuildingColumns;
  faWork = faShoePrints;
  faSkills = faScrewdriverWrench;
  faProjects = faSuitcase;
  faHashtag = faHashtag;

  

  @HostListener('document:click', ['$event'])
  handleClick(event:JQuery.ClickEvent<Document, null, Document, Document>){
    this.closeCollapse(event);
  }
  
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    this.change = false;
    for(let inverse of this.inverseElements){
      if( window.pageYOffset >= ((inverse as HTMLElement).offsetTop) - this.nav.nativeElement.clientHeight && window.pageYOffset <= (inverse as HTMLElement).offsetTop + (inverse as HTMLElement).clientHeight - this.nav.nativeElement.clientHeight){
        this.change = true;
      }
    }
  }


  
  constructor(private renderer:Renderer2, private personalData:PersonalInfoService, private router:Router){}

  determineIcon(media:string){
    switch (media.toLowerCase().trim()){
      case "linkedin":
        return faLinkedin;

      case "github":
        return faGithub;

      case "codepen":
        return faCodepen;

      case "instagram":
        return faInstagram;

      default:
        return faHashtag;
    }
  }

  giveDataContent(links:HTMLCollectionOf<Element>){
    for(let link of links){
        link.setAttribute('data-content', link.textContent!);
    }
  }

  bounce() {
    $(this).addClass('fa-bounce');
  }
  notBounce() {
      $(this).removeClass('fa-bounce');
  }


  closeCollapse(e: JQuery.ClickEvent<Document, null, Document, Document>){
      if (!this.mediaMenu.nativeElement.contains(e.target) && !$(e.target).is(this.mediaCollapse.nativeElement) && this.mediaCollapse.nativeElement.getAttribute('aria-expanded') === 'true' && this.mediaMenu.nativeElement.classList.contains('show')){
          this.collapseMedia();
      }
      if(!this.nav.nativeElement.contains(e.target) && this.navToggler.nativeElement.getAttribute('aria-expanded') === 'true' && this.navMenu.nativeElement.classList.contains('show')){
          this.collapseNav();
      }
  }

  collapseMedia(){
    (<any>$(this.mediaMenu.nativeElement)).collapse('hide');
    this.renderer.setAttribute(this.mediaCollapse.nativeElement,'aria-expanded', 'false');
  }
  
  collapseNav(){
    (<any>$(this.navMenu.nativeElement)).collapse('hide');
    this.renderer.setAttribute(this.navToggler.nativeElement,'aria-expanded', 'false');
  }

  hasRoute(route:string):boolean{
    return this.router.url === route;
  }

  ngOnInit(): void {
    this.giveDataContent(this.navLinks);

    this.personalData.getData().subscribe(data => {
      this.personalMedia = data.social;
    })
  }

  ngAfterViewInit(): void {
    $('.card-icon fa-icon').on('mouseenter', this.bounce);
    $('.card-icon fa-icon').on('mouseleave', this.notBounce);
  }
}