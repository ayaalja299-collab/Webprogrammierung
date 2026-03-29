import { RouterLink } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'], // or .scss
})
export class Contact implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private observedEls: Element[] = [];

  constructor(
    private host: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    // Reveal on scroll for selected blocks within this component
    const rootEl = this.host.nativeElement;
    const targets = rootEl.querySelectorAll('.contact-hero, .contact-card, .contact-info');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'reveal-in');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    targets.forEach((t) => {
      this.observer!.observe(t);
      this.observedEls.push(t);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observedEls.forEach((el) => this.observer!.unobserve(el));
      this.observer.disconnect();
    }
    this.observedEls = [];
  }
}
