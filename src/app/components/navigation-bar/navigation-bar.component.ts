import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { faCodepen, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHashtag, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

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

  @ViewChild('asNav') nav!:ElementRef;
  @ViewChild('asNavMenu') navMenu!:ElementRef;
  @ViewChild('asNavToggler') navToggler!:ElementRef;
  @ViewChild('asMediaCollapse') mediaCollapse!:ElementRef;
  @ViewChild('asMediaMenu') mediaMenu!:ElementRef;

  personalMedia!:Media[];
  faTerminal = faTerminal;

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

  @HostListener('document:click', ['$event'])
  handleClick(event:JQuery.ClickEvent<Document, null, Document, Document>){
    this.closeCollapse(event);
  }
  
  
  constructor(private renderer:Renderer2, private personalData:PersonalInfoService){}


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
          (<any>$(this.mediaMenu.nativeElement)).collapse('hide');
          this.renderer.setAttribute(this.mediaCollapse.nativeElement,'aria-expanded', 'false');
      }
      if(!this.nav.nativeElement.contains(e.target) && this.navToggler.nativeElement.getAttribute('aria-expanded') === 'true' && this.navMenu.nativeElement.classList.contains('show')){
          (<any>$(this.navMenu.nativeElement)).collapse('hide');
          this.renderer.setAttribute(this.navToggler.nativeElement,'aria-expanded', 'false');
      }
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