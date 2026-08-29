## Notes on the build
- **Fonts:** Bricolage Grotesque (display), Instrument Sans (body),
  Space Mono (timecodes/labels), loaded from Google Fonts.
- **Animation library:** GSAP + ScrollTrigger only, loaded via CDN in
  `index.html`. Everything else is vanilla JS in `js/main.js`.
- **Performance:** no real media is bundled (all placeholders are CSS
  gradients), so swap in compressed, appropriately-sized images
  (WebP/AVIF where possible) and add `loading="lazy"` to any `<img>`
  you add outside the hero.
- **Accessibility:** honors `prefers-reduced-motion` (skips
  text-splitting/scroll animation, shows content in its final state
  instantly), keyboard-navigable filter tabs and lightbox (Esc to
  close, arrow keys to navigate), visible focus states, and a
  honeypot field on the form instead of a CAPTCHA.
- **Horizontal scroll:** used only for the small supplementary
  "Featured Frames" filmstrip in the Work section — the main project
  grid stays a normal responsive grid for usability, per the brief's
  "don't force it" guidance.