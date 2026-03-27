import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  ngAfterViewInit() {
    this.initAnimation();
  }

  private initAnimation() {
    const holder = document.querySelector('.wrapper-holder') as HTMLElement;
    const buttons = Array.from(document.querySelectorAll('.button')) as HTMLButtonElement[];
    const slides = Array.from(document.querySelectorAll('.wrapper-holder .slide')) as HTMLElement[];
    let index = 0;
    const total = slides.length;
    const leftArrow = document.querySelector('.arrow-left') as HTMLButtonElement;
    const rightArrow = document.querySelector('.arrow-right') as HTMLButtonElement;

    if (!holder || total === 0) {
      console.warn('Slider: holder or slides not found');
      return;
    }

    function showSlide(i: number) {
      index = (i + total) % total;
      holder.style.transform = `translateX(-${index * 100}%)`;
      buttons.forEach(b => b.classList.remove('active'));
      if (buttons[index]) buttons[index].classList.add('active');
    }

    leftArrow.addEventListener('click', () => {
      showSlide(index - 1);
    });

    rightArrow.addEventListener('click', () => {
      showSlide(index + 1);
    });

    // wire buttons
    buttons.forEach(btn => {
      btn.addEventListener('click', () => showSlide(Number(btn.dataset["index"])));
    });

    // auto cycle
    let interval = setInterval(() => showSlide(index + 1), 4000);

    // pause on hover
    const wrapperEl = document.querySelector('.wrapper') as HTMLElement;
    if (wrapperEl) {
      wrapperEl.addEventListener('mouseenter', () => clearInterval(interval));
      wrapperEl.addEventListener('mouseleave', () => interval = setInterval(() => showSlide(index + 1), 4000));
    }

    // initial
    showSlide(0);
  }
}
