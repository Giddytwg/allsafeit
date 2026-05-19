// Central script initializer — imported once by Base.astro.
// Slider is only loaded on pages that actually contain a slider widget.

import { initNav } from './nav';

initNav();

if (document.querySelector('[data-slider]')) {
  import('./slider').then(({ initSliders }) => initSliders());
}
