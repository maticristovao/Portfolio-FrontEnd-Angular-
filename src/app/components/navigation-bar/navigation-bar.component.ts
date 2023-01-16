import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})

export class NavigationBarComponent implements OnInit {
  navLinks = document.getElementsByClassName('nav-link');

  @ViewChild('asNav') nav!:ElementRef;
  @ViewChild('asNavMenu') navMenu!:ElementRef;
  @ViewChild('asNavToggler') navToggler!:ElementRef;
  @ViewChild('asMediaCollapse') mediaCollapse!:ElementRef;
  @ViewChild('asMediaMenu') mediaMenu!:ElementRef;

  @HostListener('document:click', ['$event'])
  handleClick(event:JQuery.ClickEvent<Document, null, Document, Document>){
    this.closeCollapse(event);
  }
  
  
  constructor(private renderer:Renderer2){}


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
    $('.card-icon .fab').on('mouseenter', this.bounce);
    $('.card-icon .fab').on('mouseleave', this.notBounce);
  }
}