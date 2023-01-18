import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { faCodepen, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHashtag, faHome, faTerminal } from '@fortawesome/free-solid-svg-icons';
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
  inverseElements = document.getElementsByClassName('inverse');
  inverted = document.querySelectorAll('.inverse');

  @ViewChild('asNav') nav!:ElementRef;
  @ViewChild('asNavMenu') navMenu!:ElementRef;
  @ViewChild('asNavToggler') navToggler!:ElementRef;
  @ViewChild('asMediaCollapse') mediaCollapse!:ElementRef;
  @ViewChild('asMediaMenu') mediaMenu!:ElementRef;

  personalMedia!:Media[];
  faTerminal = faTerminal;
  faHome = faHome;

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
  
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    let change = false;
    for(let inverse of this.inverseElements){
      if( window.pageYOffset >= ((inverse as HTMLElement).offsetTop) - this.nav.nativeElement.clientHeight && window.pageYOffset <= (inverse as HTMLElement).offsetTop + (inverse as HTMLElement).clientHeight - this.nav.nativeElement.clientHeight){
        change = true;
      }

      if(change){
        this.renderer.addClass(this.nav.nativeElement, 'change');
      }else{
        this.renderer.removeClass(this.nav.nativeElement, 'change');
      }
    }

      // if(window.pageYOffset >= ($('.inverse').offset()?.top!) - this.nav.nativeElement.clientHeight && window.pageYOffset <= $('.inverse').offset()?.top! + $('.inverse').height()! - this.nav.nativeElement.clientHeight) {
      //   this.renderer.addClass(this.nav.nativeElement, 'change');
        
      // } else {
      //   this.renderer.removeClass(this.nav.nativeElement, 'change');
      //   console.log($('.inverse'));
      // }
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

// document.onscroll = function() {
//   const specs = document.querySelector('#about');
//   const nav = document.querySelector('nav');
  
//   if(specs!.getBoundingClientRect().top <= 0) { // if the distance of the 'specs' section to the browser top is smaller than 0
//     nav!.classList.add('change'); // add change font color
//   } else {
//     nav!.classList.remove('change'); // remove dark  font color
//   }
// }