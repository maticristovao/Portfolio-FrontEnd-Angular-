import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
// AfterViewInit

export class NavigationBarComponent implements OnInit {
  navLinks = document.getElementsByClassName('nav-link');
  outsideClick:boolean = false;
  // mediaMenu = document.getElementById('media-menu');

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


  // ESTO SE PODRÍA HACER CON DATA BINDING, SOLO HAY QUE GUARDAR EN UNA VARIABLE EL TEXTO DEL LINK
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
    $('.fab').on('mouseenter', this.bounce);
    $('.fab').on('mouseleave', this.notBounce);
  }
}



// INTEGRAR TODO ESTO AL COMPONENTE
// PENSAR O PREGUNTAR SI CONVIENE TENER ESTAS VARIABLES COMO PROPIEDADES O DEJARLAS AFUERA DE LA CLASE

// let nav = document.querySelector('nav');
// let navMenu = document.querySelector('#navbarSupportedContent');
// let navToggler = document.querySelector('.navbar-toggler');
// let mediaCollapse = document.querySelector('.dropdown-toggle');
// let mediaMenu = document.querySelector('#media-menu');


// function closeCollapse(e: JQuery.ClickEvent<Document, null, Document, Document>){
//     if (!mediaMenu!.contains(e.target) && !$(e.target).is(mediaCollapse!) && mediaCollapse!.getAttribute('aria-expanded') === 'true' && mediaMenu!.classList.contains('show')){
//         (<any>$(mediaMenu!)).collapse('hide');
//         mediaCollapse!.setAttribute('aria-expanded', 'false');
//     }
//     if(!nav!.contains(e.target) && navToggler!.getAttribute('aria-expanded') === 'true' && navMenu!.classList.contains('show')){
//         (<any>$(navMenu!)).collapse('hide');
//         navToggler!.setAttribute('aria-expanded', 'false');
//     }
// }

