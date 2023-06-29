import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonalInfoService } from 'src/app/services/personal-info.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy{
  showLoader: boolean = false;
  subscription: Subscription;

  constructor(private persServ: PersonalInfoService, private renderer: Renderer2) {
    this.subscription = this.persServ.onLoad().subscribe(value => {
      this.showLoader = value;
      this.handleScrollLock();
    });
  }
  handleScrollLock(): void {
    if (this.showLoader) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.handleScrollLock();
  }
}