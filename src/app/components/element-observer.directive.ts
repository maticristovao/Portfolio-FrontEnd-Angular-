import { Directive, Input, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[elementObserver]',
  exportAs: 'intersection'
})
export class ElementObserverDirective implements OnInit{
  @Input() threshold: number = 0;
  @Input() wait:number = 0;
  @Output() visible = new EventEmitter<HTMLElement>();

  timer = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

  private observer?:IntersectionObserver;

  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element:ElementRef) { }

  
  ngOnInit() {
    this.createObserver();
  }

  ngAfterViewInit() {
    this.startObservingElements();
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: this.threshold,
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting;

    this.observer = new IntersectionObserver((entries, observer) =>{
      entries.forEach(async entry => {
        if (isIntersecting(entry)) {
          await this.timer(this.wait);
          this.subject$.next({ entry, observer });
        }
      });
    }, options);
  }

  private startObservingElements() {
    if (!this.observer) {
      return;
    }

    this.observer.observe(this.element.nativeElement);

    this.subject$.subscribe( ({ entry, observer }) => {
        const target = entry.target as HTMLElement;
          this.visible.emit(target);
          observer.unobserve(target);
      });
  }
  
}
