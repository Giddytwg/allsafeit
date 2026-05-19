// Handles mobile hamburger toggle and mobile dropdown toggles.
// Desktop dropdowns are CSS-only (hover + focus-within). No library needed.

export function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');

  if (!toggle || !menu) return;

  // ── Mobile hamburger ────────────────────────────────────────────
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.setAttribute('data-open', String(!isOpen));
    document.body.toggleAttribute('data-nav-open', !isOpen);
  });

  // ── Mobile dropdown accordion (click-to-expand inside mobile menu)
  menu.querySelectorAll<HTMLButtonElement>('[data-dropdown-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dropdown = btn.closest<HTMLElement>('[data-dropdown]');
      if (!dropdown) return;
      const isOpen = dropdown.getAttribute('data-open') === 'true';
      // Collapse siblings
      menu.querySelectorAll<HTMLElement>('[data-dropdown][data-open="true"]').forEach((d) => {
        if (d !== dropdown) {
          d.setAttribute('data-open', 'false');
          d.querySelector('[data-dropdown-trigger]')?.setAttribute('aria-expanded', 'false');
        }
      });
      dropdown.setAttribute('data-open', String(!isOpen));
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // ── Close mobile menu on outside click ─────────────────────────
  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (!toggle.contains(target) && !menu.contains(target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('data-open', 'false');
      document.body.removeAttribute('data-nav-open');
    }
  });

  // ── Close mobile menu on Escape ────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('data-open', 'false');
      document.body.removeAttribute('data-nav-open');
      toggle.focus();
    }
  });
}
