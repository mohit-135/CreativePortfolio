/* =================================================================
   Mohit Suthar — PORTFOLIO
   Vanilla JS + GSAP/ScrollTrigger only.

   TABLE OF CONTENTS
   1. Data (projects, services)              — swap placeholder content here
   2. Render (grid, filmstrip, services)
   3. Preloader
   4. Custom cursor + magnetic buttons
   5. Mobile nav
   6. Scroll reveals + split-text (GSAP)
   7. HUD timecode + rec indicator
   8. Filter tabs
   9. Lightbox
   10. Contact form (Formspree)
   ================================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ===============================================================
     1. DATA
     SWAP: replace with your real projects. `fill` accepts any CSS
     background value — swap for `image: "path/to/photo.jpg"` and
     update render functions if you'd rather use real <img>/<video>.
     =============================================================== */
  var PROJECTS = [
    {
      id: "p01",
      category: "video",
      tag: "Video",
      title: "Northbound — Brand Film",
      client: "Northbound Coffee Co.",
      role: "Editor, Colorist",
      tools: "Premiere Pro, DaVinci Resolve",
      year: "2025",
      desc: "A 90-second brand film cut from two days of documentary footage, paced to a single unbroken voiceover take.",
      fill: "linear-gradient(135deg,#2a1210,#0B0C0E 60%)",
    },
    {
      id: "p02",
      category: "design",
      tag: "Design",
      title: "Halide Studio Identity",
      client: "Halide Design Studio",
      role: "Brand Identity, Type System",
      tools: "Illustrator, Photoshop",
      year: "2025",
      desc: "A full identity system for an architecture studio — wordmark, grid, and a stationery suite built on a single geometric mark.",
      fill: "linear-gradient(135deg,#241f14,#0B0C0E 60%)",
    },
    {
      id: "p03",
      category: "photo",
      tag: "Photography",
      title: "Low Light, Long Table",
      client: "Personal work",
      role: "Photographer",
      tools: "Sony A7S III, 50mm f/1.4",
      year: "2024",
      desc: "A series shot at a single dinner over four hours, tracking how a room changes as the light leaves it.",
      fill: "linear-gradient(135deg,#141a24,#0B0C0E 60%)",
    },
    {
      id: "p04",
      category: "video",
      tag: "Video",
      title: "Kinfolk Collective — Tour Recap",
      client: "Kinfolk Collective (band)",
      role: "Editor, Motion Graphics",
      tools: "Premiere Pro, After Effects",
      year: "2024",
      desc: "A 12-city tour recap cut for socials, with kinetic-type overlays built to match the live mix.",
      fill: "linear-gradient(135deg,#1c1424,#0B0C0E 60%)",
    },
    {
      id: "p05",
      category: "design",
      tag: "Design",
      title: "Ember & Ash — Packaging",
      client: "Ember & Ash Candle Co.",
      role: "Packaging, Label System",
      tools: "Illustrator, Photoshop",
      year: "2024",
      desc: "Label and box design for a small-batch candle line, built around a modular scent-coding system.",
      fill: "linear-gradient(135deg,#241412,#0B0C0E 60%)",
    },
    {
      id: "p06",
      category: "photo",
      tag: "Photography",
      title: "Fieldwork — Event Coverage",
      client: "Fieldwork Conference",
      role: "Event Photographer",
      tools: "Sony A7S III, 24-70mm",
      year: "2024",
      desc: "Two-day coverage of a design conference — talks, candids, and a same-day highlight edit for the organizers.",
      fill: "linear-gradient(135deg,#101f1a,#0B0C0E 60%)",
    },
    {
      id: "p07",
      category: "video",
      tag: "Video",
      title: "Slow Made — Product Film",
      client: "Slow Made Goods",
      role: "Editor, Color",
      tools: "DaVinci Resolve",
      year: "2023",
      desc: "A quiet, process-led product film for a leather goods maker, shot handheld and cut to their workshop's actual sounds.",
      fill: "linear-gradient(135deg,#231a10,#0B0C0E 60%)",
    },
    {
      id: "p08",
      category: "design",
      tag: "Design",
      title: "Meridian Zine, Issue 04",
      client: "Meridian Zine",
      role: "Layout, Art Direction",
      tools: "InDesign, Illustrator",
      year: "2023",
      desc: "Editorial layout for an independent photography zine — a loose grid built to let full-bleed images breathe.",
      fill: "linear-gradient(135deg,#181524,#0B0C0E 60%)",
    },
    {
      id: "p09",
      category: "photo",
      tag: "Photography",
      title: "Portraits, Unposed",
      client: "Personal work",
      role: "Photographer",
      tools: "85mm f/1.4",
      year: "2023",
      desc: "An ongoing series of portraits taken mid-conversation, before anyone has time to arrange themselves.",
      fill: "linear-gradient(135deg,#1a1414,#0B0C0E 60%)",
    },
  ];

  var SERVICES = [
    {
      name: "Motion Graphics",
      desc: "Kinetic type, animated logos, and short-form motion built to match a brand's existing voice.",
      tags: ["After Effects", "Premiere"],
    },
    {
      name: "Video Editing & Color",
      desc: "Narrative and brand-film editing, from assembly cut through final grade.",
      tags: ["Premiere", "Resolve"],
    },
    {
      name: "Brand Identity",
      desc: "Wordmarks, type systems, and the small rules that keep a brand consistent at any size.",
      tags: ["Illustrator", "Photoshop"],
    },
    {
      name: "Print & Packaging",
      desc: "Layout and packaging design built to survive contact with an actual printer.",
      tags: ["InDesign", "Illustrator"],
    },
    {
      name: "Event Photography",
      desc: "Documentary-style coverage for conferences, launches, and live shows.",
      tags: ["A7S III", "Lightroom"],
    },
    {
      name: "Portrait & Product",
      desc: "Considered, lightly-directed portraits and product photography for small brands.",
      tags: ["Studio", "Natural light"],
    },
  ];

  /* ===============================================================
     2. RENDER
     =============================================================== */
  var CATEGORY_LABEL = {
    video: "Video",
    design: "Design",
    photo: "Photography",
  };

  function renderProjectGrid() {
    var grid = document.getElementById("projectGrid");
    var html = PROJECTS.map(function (p, i) {
      return (
        '<article class="project-card" data-category="' +
        p.category +
        '" data-project-id="' +
        p.id +
        '" tabindex="0" data-cursor="link" role="button" aria-label="View project: ' +
        p.title +
        '">' +
        '<div class="project-card-media">' +
        '<div class="project-card-fill" style="background:' +
        p.fill +
        '"></div>' +
        '<span class="project-card-tag">' +
        p.tag +
        "</span>" +
        '<span class="project-card-idx" data-mono>PRJ_' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        '<div class="project-card-overlay">' +
        '<p class="project-card-title">' +
        p.title +
        "</p>" +
        '<p class="project-card-meta">' +
        p.client +
        " — " +
        p.year +
        "</p>" +
        "</div>" +
        "</div>" +
        "</article>"
      );
    }).join("");
    grid.innerHTML = html;
  }

  function renderFilmstrip() {
    var strip = document.getElementById("filmstrip");
    // Purely decorative highlight reel, cycles through project fills
    var html = PROJECTS.map(function (p, i) {
      return (
        '<div class="filmstrip-cell" data-mono>' +
        '<div class="filmstrip-cell-fill" style="background:' +
        p.fill +
        '"></div>' +
        '<span class="filmstrip-cell-label">' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        "</div>"
      );
    }).join("");
    strip.innerHTML = html;
  }

  function renderServices() {
    var list = document.getElementById("servicesList");
    var html = SERVICES.map(function (s, i) {
      return (
        '<div class="service-row">' +
        '<span class="service-idx" data-mono>' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        '<span class="service-name">' +
        s.name +
        "</span>" +
        '<p class="service-desc">' +
        s.desc +
        "</p>" +
        '<div class="service-tags">' +
        s.tags
          .map(function (t) {
            return '<span class="service-tag">' + t + "</span>";
          })
          .join("") +
        "</div>" +
        "</div>"
      );
    }).join("");
    list.innerHTML = html;
  }

  renderProjectGrid();
  renderFilmstrip();
  renderServices();

  document.getElementById("footerYear").textContent = new Date().getFullYear();

  /* ===============================================================
     3. PRELOADER — film-leader countdown (3 → 2 → 1 → reveal)
     =============================================================== */
  function runPreloader() {
    var preloader = document.getElementById("preloader");
    var numberEl = document.getElementById("leaderNumber");
    var progressCircle = document.querySelector(".leader-progress");
    var circumference = 565.5;

    if (prefersReducedMotion) {
      preloader.classList.add("is-done");
      preloader.style.display = "none";
      startPageAnimations();
      return;
    }

    var counts = [3, 2, 1];
    var step = 0;

    function tick() {
      numberEl.textContent = counts[step];
      gsap.fromTo(
        progressCircle,
        { strokeDashoffset: circumference },
        { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" },
      );
      gsap.fromTo(
        numberEl,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
      );
      step++;
      if (step < counts.length) {
        setTimeout(tick, 550);
      } else {
        setTimeout(finish, 500);
      }
    }

    function finish() {
      gsap.to(".preloader-inner", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      });
      gsap.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        delay: 0.2,
        ease: "power4.inOut",
        onComplete: function () {
          preloader.classList.add("is-done");
          preloader.style.display = "none";
        },
      });
      startPageAnimations();
    }

    tick();
  }

  /* ===============================================================
     4. CUSTOM CURSOR + MAGNETIC BUTTONS
     =============================================================== */
  function initCursor() {
    var isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isFinePointer) return;

    var cursor = document.querySelector(".cursor");
    var ring = document.querySelector(".cursor-ring");
    var dot = document.querySelector(".cursor-dot");
    var mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;
    var ringX = mouseX,
      ringY = mouseY;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px)";
    });

    (function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px)";
      requestAnimationFrame(loop);
    })();

    document.addEventListener("mousedown", function () {
      cursor.classList.add("is-down");
    });
    document.addEventListener("mouseup", function () {
      cursor.classList.remove("is-down");
    });

    document
      .querySelectorAll('[data-cursor="link"], .project-card, button, a')
      .forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("is-hover");
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-hover");
        });
      });
  }

  function initMagneticButtons() {
    var isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    document.querySelectorAll(".btn--magnetic").forEach(function (btn) {
      var strength = 24;
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var relX = e.clientX - rect.left - rect.width / 2;
        var relY = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: (relX / rect.width) * strength,
          y: (relY / rect.height) * strength,
          duration: 0.3,
          ease: "power2.out",
        });
        var label = btn.querySelector("span");
        if (label)
          gsap.to(label, {
            x: (relX / rect.width) * (strength * 0.4),
            y: (relY / rect.height) * (strength * 0.4),
            duration: 0.3,
            ease: "power2.out",
          });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
        var label = btn.querySelector("span");
        if (label)
          gsap.to(label, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
      });
    });
  }

  /* ===============================================================
     5. MOBILE NAV
     =============================================================== */
  function initMobileNav() {
    var burger = document.getElementById("navBurger");
    var panel = document.getElementById("mobileNav");

    burger.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen);
      burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ===============================================================
     6. SCROLL REVEALS + SPLIT TEXT (GSAP / ScrollTrigger)
     =============================================================== */
  function splitIntoChars(el) {
    var text = el.textContent;
    el.textContent = "";
    text.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "split-char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });
    return el.querySelectorAll(".split-char");
  }

  function splitIntoWords(el) {
    var text = el.textContent;
    el.textContent = "";
    text.split(" ").forEach(function (word, i, arr) {
      var span = document.createElement("span");
      span.className = "split-word";
      span.style.overflow = "hidden";
      var inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = word + (i < arr.length - 1 ? "\u00A0" : "");
      span.appendChild(inner);
      el.appendChild(span);
    });
    return el.querySelectorAll(".split-word > span");
  }

  function startPageAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    /* --- Reduced motion: skip text-splitting and scroll-triggered
       motion entirely, just reveal everything in its final state --- */
    if (prefersReducedMotion) {
      gsap.set(
        ".reveal-up, .tools-grid > *, .project-grid > *, .services-list > *",
        { opacity: 1, y: 0 },
      );
      ScrollTrigger.create({
        trigger: ".hero",
        start: "bottom top",
        onEnter: function () {
          document.getElementById("siteNav").classList.add("is-scrolled");
        },
        onLeaveBack: function () {
          document.getElementById("siteNav").classList.remove("is-scrolled");
        },
      });
      return;
    }

    if (window.ScrollTrigger.normalizeScroll) {
      ScrollTrigger.normalizeScroll(true);
    }

    /* --- Hero heading letter reveal --- */
    var heroChars = splitIntoChars(
      document.querySelector(".hero-title .split-line"),
    );
    gsap.set(heroChars, { yPercent: 110 });
    gsap.to(heroChars, {
      yPercent: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.02,
      delay: 0.1,
    });

    /* --- Hero supporting lines --- */
    gsap.to(".hero .reveal-up", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.5,
    });

    /* --- Section headings: word-by-word reveal on scroll --- */
    document.querySelectorAll("[data-split-words]").forEach(function (heading) {
      var words = splitIntoWords(heading);
      gsap.set(words, { yPercent: 100 });
      gsap.to(words, {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.03,
        scrollTrigger: { trigger: heading, start: "top 85%" },
      });
    });

    /* --- Generic fade/slide reveals --- */
    document.querySelectorAll(".reveal-up").forEach(function (el) {
      if (el.closest(".hero")) return; // hero already handled above
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    /* --- Tool cards + project cards + service rows: staggered by parent --- */
    gsap.utils
      .toArray(".tools-grid, .project-grid, .services-list")
      .forEach(function (group) {
        var items = group.children;
        gsap.set(items, { opacity: 0, y: 24 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

    /* --- Nav background solidifies after scrolling past hero --- */
    ScrollTrigger.create({
      trigger: ".hero",
      start: "bottom top",
      onEnter: function () {
        document.getElementById("siteNav").classList.add("is-scrolled");
      },
      onLeaveBack: function () {
        document.getElementById("siteNav").classList.remove("is-scrolled");
      },
    });

    ScrollTrigger.refresh();
  }

  /* ===============================================================
      7. HUD TIMECODE — ticks up with scroll position (mm:ss:ff style)
     =============================================================== */
  function initTimecode() {
    var el = document.getElementById("hudTimecode");
    function format(n) {
      return String(n).padStart(2, "0");
    }
    function update() {
      var doc = document.documentElement;
      var scrollPct =
        doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      var totalFrames = Math.floor(scrollPct * (24 * 60 * 5)); // pretend 5-minute reel @24fps
      var frames = totalFrames % 24;
      var totalSeconds = Math.floor(totalFrames / 24);
      var seconds = totalSeconds % 60;
      var minutes = Math.floor(totalSeconds / 60) % 60;
      var hours = Math.floor(totalSeconds / 3600);
      el.textContent =
        format(hours) +
        ":" +
        format(minutes) +
        ":" +
        format(seconds) +
        ":" +
        format(frames);
    }
    document.addEventListener(
      "scroll",
      function () {
        requestAnimationFrame(update);
      },
      { passive: true },
    );
    update();
  }

  /* ===============================================================
     8. FILTER TABS
     =============================================================== */
  function initFilters() {
    var buttons = document.querySelectorAll(".filter-btn");
    var countEl = document.getElementById("filterCount");

    function applyFilter(category) {
      var cards = document.querySelectorAll(".project-card");
      var visibleCount = 0;
      cards.forEach(function (card) {
        var matches = category === "all" || card.dataset.category === category;
        if (matches) {
          visibleCount++;
          card.classList.remove("is-hidden");
          gsap.fromTo(
            card,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          );
        } else {
          card.classList.add("is-hidden");
        }
      });
      countEl.textContent =
        visibleCount + (visibleCount === 1 ? " project" : " projects");
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        applyFilter(btn.dataset.filter);
      });
    });

    applyFilter("all");
  }

  /* ===============================================================
     9. LIGHTBOX
     =============================================================== */
  function initLightbox() {
    var lightbox = document.getElementById("lightbox");
    var mediaEl = document.getElementById("lightboxMedia");
    var categoryEl = document.getElementById("lightboxCategory");
    var titleEl = document.getElementById("lightboxTitle");
    var descEl = document.getElementById("lightboxDesc");
    var metaEl = document.getElementById("lightboxMeta");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");
    var currentIndex = 0;
    var lastFocused = null;

    function populate(index) {
      var visibleProjects = getVisibleProjects();
      currentIndex = (index + visibleProjects.length) % visibleProjects.length;
      var p = visibleProjects[currentIndex];

      mediaEl.style.background = p.fill;
      categoryEl.textContent = CATEGORY_LABEL[p.category];
      titleEl.textContent = p.title;
      descEl.textContent = p.desc;
      metaEl.innerHTML =
        "<div><dt>Client</dt><dd>" +
        p.client +
        "</dd></div>" +
        "<div><dt>Role</dt><dd>" +
        p.role +
        "</dd></div>" +
        "<div><dt>Tools</dt><dd>" +
        p.tools +
        "</dd></div>";
    }

    function getVisibleProjects() {
      var activeFilter = document.querySelector(".filter-btn.is-active").dataset
        .filter;
      return PROJECTS.filter(function (p) {
        return activeFilter === "all" || p.category === activeFilter;
      });
    }

    function open(projectId) {
      var visibleProjects = getVisibleProjects();
      var index = visibleProjects.findIndex(function (p) {
        return p.id === projectId;
      });
      populate(index === -1 ? 0 : index);
      lastFocused = document.activeElement;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close").focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document
      .getElementById("projectGrid")
      .addEventListener("click", function (e) {
        var card = e.target.closest(".project-card");
        if (card) open(card.dataset.projectId);
      });
    document
      .getElementById("projectGrid")
      .addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          var card = e.target.closest(".project-card");
          if (card) {
            e.preventDefault();
            open(card.dataset.projectId);
          }
        }
      });

    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });

    prevBtn.addEventListener("click", function () {
      populate(currentIndex - 1);
    });
    nextBtn.addEventListener("click", function () {
      populate(currentIndex + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") populate(currentIndex - 1);
      if (e.key === "ArrowRight") populate(currentIndex + 1);
    });
  }

  /* ===============================================================
     10. CONTACT FORM — Formspree
     SWAP: put your real Formspree endpoint here. Everything else
     (validation, states, success/error messaging) stays the same
     if you later move to a different backend — just point fetch()
     at your new URL and adjust the response check if needed.
     =============================================================== */
  var FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // <-- swap this

  function initContactForm() {
    var form = document.getElementById("contactForm");
    var statusEl = document.getElementById("formStatus");
    var submitBtn = form.querySelector(".form-submit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot check — if filled, silently drop (likely a bot)
      if (form.company.value) return;

      submitBtn.classList.add("is-sending");
      submitBtn.disabled = true;
      statusEl.textContent = "";
      statusEl.className = "form-status";

      var data = new FormData(form);

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            statusEl.textContent =
              "Thanks — your message is on its way. I'll reply soon.";
            statusEl.classList.add("is-success");
            form.reset();
          } else {
            return response.json().then(function (body) {
              throw new Error((body && body.error) || "Something went wrong.");
            });
          }
        })
        .catch(function () {
          statusEl.textContent =
            "Something went wrong sending that — try again, or email me directly.";
          statusEl.classList.add("is-error");
        })
        .finally(function () {
          submitBtn.classList.remove("is-sending");
          submitBtn.disabled = false;
        });
    });
  }

  /* ===============================================================
     INIT
     =============================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    initCursor();
    initMagneticButtons();
    initMobileNav();
    initTimecode();
    initFilters();
    initLightbox();
    initContactForm();
    runPreloader();
  });
})();
