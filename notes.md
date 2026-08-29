# Jordan Reyes — Portfolio Site

Plain HTML/CSS/JS + GSAP (ScrollTrigger) via CDN. No build step — open
`index.html` in a browser, or serve the folder with any static host
(Netlify, Vercel, GitHub Pages, S3, etc).

## Design concept
The site is built around the subject: everything borrows from camera
and edit-suite language — viewfinder corner brackets, a live "REC"
indicator, a scroll-driven timecode readout, a film-leader 3-2-1
countdown preloader, and a contact-sheet/filmstrip motif in the Work
section. Accent color `#FF3B2F` is the "tally light" red you'd see on
a recording camera.

## Where to plug in your real content

**1. Copy & bio** — `index.html`
Every placeholder paragraph (hero subhead, About bio/philosophy) is
plain text in `index.html` — search for `PLACEHOLDER BIO` in the About
section and edit directly.

**2. Projects** — `js/main.js`, top of the file, `PROJECTS` array.
Each project is one object:
```js
{
  id: "p01", category: "video", // "video" | "design" | "photo"
  tag: "Video", title: "...", client: "...", role: "...",
  tools: "...", year: "2025", desc: "...",
  fill: "linear-gradient(...)" // swap for a real image, see below
}
```
Add, remove, or reorder objects freely — the grid, filter tabs,
filmstrip, and lightbox all render from this one array.

**To use real images/video instead of gradient placeholders:**
- Replace the `fill` property with an image path, e.g. `image: "img/project-01.jpg"`.
- In `renderProjectGrid()` and the lightbox `populate()` function
  (both in `js/main.js`), swap the `style="background:..."` divs for
  an `<img loading="lazy" src="...">` (grid) and a full `<img>`/`<video>`
  (lightbox). For video thumbnails, add a `<video muted loop playsinline>`
  and trigger `.play()`/`.pause()` on `mouseenter`/`mouseleave` for the
  "hover to autoplay" effect described in the brief.

**3. Hero showreel** — `index.html`, Hero section.
Find the comment `Showreel background placeholder` and replace the
`.hero-reel-placeholder` div with:
```html
<video class="hero-reel" autoplay muted loop playsinline poster="poster.jpg">
  <source src="your-showreel.mp4" type="video/mp4">
</video>
```
Add `.hero-reel { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }`
to `style.css`. Keep the file compressed/short (5–10s loop) for fast load.

**4. Formspree endpoint** — `js/main.js`, search for `FORM_ENDPOINT`
```js
var FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // <-- put your real endpoint here
```
That's the only line to change. The form already posts via `fetch()`
with `FormData`, so pointing it at a different backend later is a
one-line swap — just make sure the new endpoint accepts the same
`name` / `email` / `message` fields (and returns a non-2xx status on
failure, which the existing error-handling already checks for).

**5. Social links & email** — `index.html`
Search for `SWAP: real email` (Contact section) and `SWAP: real social
URLs` (Contact + Footer) and update the `href` values.

**6. Calendly link** — `index.html`, Contact section
Search for `SWAP: replace href with your real Calendly` and update
the "Book a discovery call" button's `href`.

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
