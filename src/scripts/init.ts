// Central script initializer — imported once by Base.astro.
// Add new module calls here. Conditional imports keep bundles small.

import { initNav } from './nav';
import { initSliders } from './slider';

initNav();
initSliders();
