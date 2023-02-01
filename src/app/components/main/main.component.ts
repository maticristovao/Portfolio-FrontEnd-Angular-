import { AfterViewChecked, AfterViewInit, Component, HostListener } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit{
  windowWidth:number = window.innerWidth;
  windowHeight:number = window.innerHeight;

  @HostListener('window:resize')
  onResize(){
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  defineThreshold(){
    if(this.windowHeight<800){
      return '[0.2]';
    }
    if(this.windowWidth>1200){
      return '[0.5]';
    }else{
      return '[0.4]';
    }
  }

  ngAfterViewInit(): void {
    const wrapper = document.querySelector('#scroll');
    const scrollSpy = new bootstrap.ScrollSpy(wrapper, {
      target: '#nav'
    })
  }
}
