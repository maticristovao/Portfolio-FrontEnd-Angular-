import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { Carousel } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy{
  // @ViewChild('asCarousel')carousel!:ElementRef;
  carousel!:HTMLElement | null;
  faDownload = faArrowCircleDown;
  personalInfo:any;
  images:string[]=[
    'https://elceo.com/wp-content/uploads/2021/10/mexico-economia-av.jpg',
    'https://www.fundacionaquae.org/wp-content/uploads/2020/04/Nuevas-formas-de-trabajo3-1-002.jpg',
    'https://a.storyblok.com/f/112937/568x400/19b8611e4b/10-most-fun-languages-to-learn_square-568x400.jpg/m/620x0/filters:quality(70)/'
  ]

  @HostListener('window:resize')
  @HostListener('window:resize')
  onResize() {
    this.defineName();
    this.defineSurname();
  }

  constructor(private personalData:PersonalInfoService, private renderer:Renderer2){
  }

  removeAccents(str:string):string{
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  defineName(){
    if(window.innerWidth>1000){
      return this.removeAccents(this.personalInfo.name)
    }else{
      return this.removeAccents(this.personalInfo.name)[0];
    }
  }

  defineSurname(){
    if(window.innerWidth>=730){
      return this.removeAccents(this.personalInfo.surname)
    }else{
      return this.removeAccents(this.personalInfo.surname)[0];
    }
  }

  ngOnInit(): void {
    this.personalData.getData().subscribe(data =>{
      this.personalInfo = data;
    })
    this.defineName();
    this.defineSurname();
  }

  ngAfterViewInit(){
    // new bootstrap.Carousel(<any>$("#exampleSelector")).cycle()
    this.carousel = document.getElementById('carousel')
  }

  ngOnDestroy(){
    this.carousel?.remove();
  }
}