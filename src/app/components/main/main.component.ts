import { AfterViewInit, Component, HostListener } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {
  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  ngAfterViewInit(): void {
    const WRAPPER = document.querySelector('#scroll');
    const SCROLLSPY = new bootstrap.ScrollSpy(WRAPPER, {
      target: '#nav'
    });
  }
}