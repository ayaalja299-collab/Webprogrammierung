export function initHome ()
{
  // JavaScript source code
  const holder = document.querySelector('.wrapper-holder');
  const buttons = Array.from(document.querySelectorAll('.button'));
  const slides = Array.from(document.querySelectorAll('.wrapper-holder .slide'));
  let index = 0;
  const total = slides.length;
  const leftArrow = document.querySelector('.arrow-left');
  const rightArrow = document.querySelector('.arrow-right');

  leftArrow.addEventListener('click', () => {
    showSlide(index - 1);
  });

  rightArrow.addEventListener('click', () => {
    showSlide(index + 1);
  });
  // Guard: nothing to do if slider not present
  if (!holder || total === 0) {
    // Optionally log to console for debugging
    console.warn('Slider: holder or slides not found');
  } else {

    function showSlide(i) {
      index = (i + total) % total;
      holder.style.transform = `translateX(-${index * 100}%)`;
      buttons.forEach(b => b.classList.remove('active'));
      if (buttons[index]) buttons[index].classList.add('active');
    }

    // wire buttons (they are <button> with data-index)
    buttons.forEach(btn => {
      btn.addEventListener('click', () => showSlide(Number(btn.dataset.index)));
    });

    // auto cycle (optional)
    let interval = setInterval(() => showSlide(index + 1), 4000);

    // pause on hover if wrapper exists
    const wrapperEl = document.querySelector('.wrapper');
    if (wrapperEl) {
      wrapperEl.addEventListener('mouseenter', () => clearInterval(interval));
      wrapperEl.addEventListener('mouseleave', () => interval = setInterval(() => showSlide(index + 1), 4000));
    }

    // initial
    showSlide(0);
  }
}
