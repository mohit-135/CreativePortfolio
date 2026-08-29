# Mohit Suthar — Portfolio Site

Plain HTML/CSS/JS + GSAP (ScrollTrigger) via CDN. No build step — open
`index.html` in a browser, or serve the folder with any static host.

## What changed in this pass

**About section**
- Added a photo slot (`about-photo-frame`) to the left of the bio. It
  currently shows a styled placeholder. To use a real photo:
  1. Drop your photo in an `img/` folder next to `index.html`.
  2. In `index.html`, find the `about-photo-frame` block and set the
     `<img>` tag's `src` (and a real `alt`), then remove its `hidden`
     attribute. You can also delete the `about-photo-fill` div once
     the real image is in place.

**Work section — fully restructured**
"Design" has been removed from the portfolio entirely. Work now splits
into two toggleable disciplines, each with its own sub-tabs:

```
Video Editing              Photography
 ├─ Edits                   ├─ Photography (general portfolio)
 └─ Color Grading           ├─ Event Photography (grouped by event)
                             └─ Photo Editing (before/after slider)
```

- **Video grids** use a CSS masonry (multi-column) layout so
  horizontal (16:9) and vertical (9:16) clips both sit naturally
  without gaps or forced cropping. Each card shows a duration badge
  and opens a lightbox with title, client, role, tools, and duration —
  the lightbox's prev/next only cycles through whichever sub-tab
  (Edits or Color Grading) is currently open.
- **Photography** uses the same masonry approach with
  landscape/portrait/square variants.
- **Event Photography** groups photos under named event headers
  (placeholder events: Independence Day Celebration, Annual Club
  Meet, College Cultural Fest) — each with its own date and its own
  masonry grid. The lightbox's prev/next stays scoped to the event
  you clicked into.
- **Photo Editing** shows before/after pairs as a draggable
  comparison slider (a native `<input type="range">` drives a CSS
  clip-path, so it's fully keyboard- and screen-reader-accessible,
  not just mouse/touch).

## Where to plug in your real content

**1. Photo (About)** — see above.

**2. All Work content** — `main.js`, top of the file, the `WORK` object.
Everything in the Work section renders from this one object:
```js
var WORK = {
  video: {
    edits: [ { id, title, client, role, tools, year, duration, orientation, desc, fill } ],
    color: [ ... same shape ... ]
  },
  photo: {
    photography: [ { id, title, client/role, tools, year, orientation, desc, fill } ],
    event: {
      "Event Name": { date: "DD Mon YYYY", items: [ { id, title, role, tools, orientation, desc, fill } ] }
    },
    editing: [ { id, title, tools, year, desc, beforeFill, afterFill } ]
  }
}
```
- `orientation` for video is `"horizontal"` or `"vertical"`.
- `orientation` for photos is `"landscape"`, `"portrait"`, or `"square"`.
- Add, remove, rename, or reorder items/events freely — the grids,
  sub-tabs, event headers, lightbox, and comparison sliders all read
  straight from this object.

**To use real photos/videos instead of gradient placeholders:**
- Replace `fill` (or `beforeFill`/`afterFill`) with an image path,
  e.g. `image: "img/edit-01.jpg"`.
- In `main.js`, swap the `style="background:..."` divs in
  `videoCardHTML()`, `photoCardHTML()`, and `renderEditingCompare()`
  for `<img loading="lazy" src="...">` (grid thumbnails) — and do the
  same in the lightbox's `populate()` function for the enlarged view.
  For video thumbnails, use a muted `<video loop playsinline>` and
  trigger `.play()`/`.pause()` on hover for a live preview.

**3. Everything else** (hero showreel, Formspree endpoint, socials,
Calendly link, footer) is unchanged from the previous build — search
`index.html`/`main.js` for the `SWAP:` comments.

## Notes on the build
- **Fonts:** Bricolage Grotesque (display), Instrument Sans (body),
  Space Mono (timecodes/labels), loaded from Google Fonts.
- **Animation library:** GSAP + ScrollTrigger only, via CDN. Everything
  else is vanilla JS in `main.js`.
- **Accessibility:** honors `prefers-reduced-motion`; the discipline
  toggle, sub-tabs, and lightbox are keyboard-operable (Tab/Enter,
  Esc to close, arrow keys to navigate); the before/after sliders are
  real range inputs, so they work with a keyboard or screen reader
  out of the box.
- **Masonry grids** use CSS `columns` rather than a JS masonry
  library — this keeps things dependency-free and handles the mixed
  horizontal/vertical media requirement without extra code.
