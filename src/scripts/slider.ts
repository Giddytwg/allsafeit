export function initSliders(): void {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((slider) => {
    const mask = slider.querySelector<HTMLElement>('[data-slider-mask]');
    const slides = Array.from(slider.querySelectorAll<HTMLElement>('[data-slider-slide]'));
    const prevBtn = slider.querySelector<HTMLElement>('[data-slider-prev]');
    const nextBtn = slider.querySelector<HTMLElement>('[data-slider-next]');

    if (!mask || slides.length === 0) return;

    let current = 0;
    let autoplayTimer: ReturnType<typeof setInterval> | null = null;

    const autoplayDelay = Number(slider.dataset.sliderDelay ?? 2000);

    function goTo(index: number): void {
      current = (index + slides.length) % slides.length;
      mask!.style.transform = `translateX(-${current * 100}%)`;
    }

    function startAutoplay(): void {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goTo(current + 1), autoplayDelay);
    }

    function stopAutoplay(): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    prevBtn?.addEventListener('click', () => {
      stopAutoplay();
      goTo(current - 1);
      startAutoplay();
    });

    nextBtn?.addEventListener('click', () => {
      stopAutoplay();
      goTo(current + 1);
      startAutoplay();
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Respect prefers-reduced-motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startAutoplay();
    }
  });

  // Conditionally load Finsweet for CMS testimonials slider
  const testimonialEl = document.getElementById('testimonial');
  if (testimonialEl) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js';
    script.async = true;
    document.body.appendChild(script);
  }
}
