import { RouterLink } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [RouterLink],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css'], // or .scss
})
export class Faq implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;
  private observedEls: Element[] = [];

  constructor(
    private host: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    const rootEl = this.host.nativeElement;

    // Reveal on scroll
    const revealTargets = rootEl.querySelectorAll('.faq-hero, .faq-accordion, .faq-tips');
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

    revealTargets.forEach((t) => {
      this.observer!.observe(t);
      this.observedEls.push(t);
    });

    // Keyboard support for accordion headers (Enter/Space toggles)
    rootEl.addEventListener('keydown', (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isHeader = target.classList.contains('faq-item-header');
      const code = e.code || (e as any).key;
      if (isHeader && (code === 'Enter' || code === 'Space' || code === ' ')) {
        e.preventDefault();
        target.click();
      }
    });

    // Click toggle behavior
    rootEl.querySelectorAll<HTMLElement>('.faq-item-header').forEach((header) => {
      header.addEventListener('click', () => {
        const item = header.closest('.faq-item') as HTMLElement | null;
        if (!item) return;

        const isOpen = item.classList.contains('open');
        const content = item.querySelector<HTMLElement>('.faq-item-content');
        const button = header.querySelector<HTMLButtonElement>('button');

        // Close all siblings (optional: accordion behavior)
        rootEl.querySelectorAll<HTMLElement>('.faq-item.open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const b = openItem.querySelector<HTMLButtonElement>('button');
            const c = openItem.querySelector<HTMLElement>('.faq-item-content');
            if (b) b.setAttribute('aria-expanded', 'false');
            if (c) c.setAttribute('aria-hidden', 'true');
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('open');
          if (button) button.setAttribute('aria-expanded', 'false');
          if (content) content.setAttribute('aria-hidden', 'true');
        } else {
          item.classList.add('open');
          if (button) button.setAttribute('aria-expanded', 'true');
          if (content) content.setAttribute('aria-hidden', 'false');
        }
      });
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
