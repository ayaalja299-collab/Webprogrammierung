import { RouterLink } from "@angular/router"
import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css'] // or .css
})
export class AboutUs implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private observedEls: Element[] = [];

  constructor(private host: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Query inside this component’s host only
    const rootEl = this.host.nativeElement;
    const targets = rootEl.querySelectorAll('.about-card, .about-how-inner, .about-promise-box');

    // Create an IntersectionObserver
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'reveal-in');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Start observing
    targets.forEach(t => {
      this.observer!.observe(t);
      this.observedEls.push(t);
    });
  }

  ngOnDestroy(): void {
    // Clean up observer
    if (this.observer) {
      this.observedEls.forEach(el => this.observer!.unobserve(el));
      this.observer.disconnect();
    }
    this.observedEls = [];
  }
}

