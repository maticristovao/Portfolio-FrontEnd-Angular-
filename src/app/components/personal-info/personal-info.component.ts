import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{
  @ViewChild('asMore') more!:ElementRef;
  moreContent!:string;

  @HostListener('window:resize')
  onResize() {
    this.defineContent();
  }

  constructor(){
    this.defineContent();
  }

  defineContent(){
    if(window.innerWidth>=1200){
      this.moreContent = 'More';
    }else{
      this.moreContent = '...';
    }
  }

  ngOnInit(): void {
    
  }
}