/* =================================================================
   Mohit Suthar — PORTFOLIO
   Vanilla JS + GSAP/ScrollTrigger only.

   TABLE OF CONTENTS
   1. Data (work, services)                   — swap placeholder content here
   2. Render (video/photo grids, filmstrip, services)
   3. Preloader
   4. Custom cursor + magnetic buttons
   5. Mobile nav
   6. Scroll reveals + split-text (GSAP)
   7. HUD timecode + rec indicator
   8. Work section: mode toggle, sub-tabs, panels
   9. Lightbox
   10. Before/after comparison sliders
   11. Contact form (Formspree)
   ================================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ===============================================================
     1. DATA
     SWAP: replace with your real work. `fill` accepts any CSS
     background value — swap for `image: "path/to/photo.jpg"` and
     update the render functions below if you'd rather use real
     <img>/<video> elements instead of gradient placeholders.

     orientation drives the aspect ratio of each card in the masonry
     grid: "horizontal" | "vertical" for video, and
     "landscape" | "portrait" | "square" for photos.
     =============================================================== */
  var WORK = {
    video: {
      edits: [
        {
          id: "v01",
          title: "Maastis Edit",
          client: "Mastis Entertainment",
          role: "Editor",
          tools: "Premiere Pro",
          year: "2026",
          duration: "01:32",
          orientation: "vertical",
          desc: "A fast-paced edit focused on rhythm, transitions, and clean visual flow.",
          fill: "linear-gradient(135deg,#2a1210,#0B0C0E 60%)",
          video: "projects/videos/MaastisEdit.mp4",
        },
        {
          id: "v02",
          title: "Rap song video Edit",
          client: "Vinayak mittal and Mayank Joshi",
          role: "Editor",
          tools: "Premiere Pro",
          year: "2026",
          duration: "00:48",
          orientation: "vertical",
          desc: "A vertical music edit built for social viewing, with pacing shaped around the track.",
          fill: "linear-gradient(135deg,#1c1424,#0B0C0E 60%)",
          video: "projects/videos/song.mp4",
        },
        {
          id: "v03",
          title: "Shimla Travel Edit",
          client: "Abhishek Suthar",
          role: "Editor",
          tools: "Premiere Pro",
          year: "2026",
          duration: "02:10",
          orientation: "horizontal",
          desc: "A travel-style edit using pacing, cuts, and atmosphere to capture the feel of Shimla.",
          fill: "linear-gradient(135deg,#231a10,#0B0C0E 60%)",
          video: "projects/videos/shimla.mp4",
        },
        {
          id: "v04",
          title: "You shake my Nerves",
          client: "Personal work",
          role: "Editor",
          tools: "Davinci Resolve",
          year: "2026",
          duration: "00:13",
          orientation: "horizontal",
          desc: "A fast paced car edit with fast transitions and color grading.",
          fill: "linear-gradient(135deg,#1a1f24,#0B0C0E 60%)",
          video: "projects/videos/GreatBallsOffire.mp4",
        },
      ],
      color: [
        // {
        //   id: "v05",
        //   title: "Dusk Run — Color Grade",
        //   client: "Personal work",
        //   role: "Colorist",
        //   tools: "DaVinci Resolve",
        //   year: "2026",
        //   duration: "01:05",
        //   orientation: "horizontal",
        //   desc: "A warm, low-contrast grade built around golden-hour footage — grain added back in after noise reduction.",
        //   fill: "linear-gradient(135deg,#2a1a10,#0B0C0E 60%)",
        // },
        // {
        //   id: "v06",
        //   title: "Neon Alley — Grade Study",
        //   client: "Personal work",
        //   role: "Colorist",
        //   tools: "DaVinci Resolve",
        //   year: "2024",
        //   duration: "00:52",
        //   orientation: "vertical",
        //   desc: "A teal/magenta night grade study shot handheld, matched across three different lighting setups.",
        //   fill: "linear-gradient(135deg,#191029,#0B0C0E 60%)",
        // },
        // {
        //   id: "v07",
        //   title: "Harvest — Documentary Grade",
        //   client: "Harvest Collective",
        //   role: "Colorist",
        //   tools: "DaVinci Resolve",
        //   year: "2023",
        //   duration: "03:20",
        //   orientation: "horizontal",
        //   desc: "A naturalistic grade for a short documentary, matched across three cameras shot over one growing season.",
        //   fill: "linear-gradient(135deg,#1c2410,#0B0C0E 60%)",
        // },
      ],
    },
    photo: {
      photography: [
        {
          id: "p01",
          title: "Portraits, Unposed",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "portrait",
          desc: "A portrait frame focused on natural expression and clean finishing.",
          fill: "linear-gradient(135deg,#1a1414,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/GAZjYqytvYTV2tiGWNWk/image.jpg",
        },
        {
          id: "p02",
          title: "Low Light, Long Table",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "portrait",
          desc: "A low-light frame edited for mood, contrast, and atmosphere.",
          fill: "linear-gradient(135deg,#141a24,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/UqnS0jwLK4bxYECCHDHo/image.png",
        },
        {
          id: "p03",
          title: "Street, Quiet Hours",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "portrait",
          desc: "A quiet street-style composition with a simple, graphic read.",
          fill: "linear-gradient(135deg,#10181f,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/ZOPliFd1eDSLkOHbTuqG/image.png",
        },
        {
          id: "p04",
          title: "Textures & Still Life",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "landscape",
          desc: "A detail-led frame built around texture, light, and negative space.",
          fill: "linear-gradient(135deg,#24201a,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/RqDVetaWFNWibAWWspYt/image.png",
        },
        {
          id: "p05",
          title: "Golden Hour, Coastline",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "portrait",
          desc: "A warm outdoor frame finished for color and depth.",
          fill: "linear-gradient(135deg,#241a10,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/PNPy8kNf2w7En2KJafpb/image.jpg",
        },
        {
          id: "p06",
          title: "Studio Portrait Series",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "portrait",
          desc: "A polished portrait frame with controlled contrast and clean tones.",
          fill: "linear-gradient(135deg,#1a1420,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/b3Dm9472vSHfbwQ77MzG/image.jpg",
        },
        {
          id: "p07",
          title: "Dance Performance Candids",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "portrait",
          desc: "A polished portrait frame with controlled contrast and clean tones.",
          fill: "linear-gradient(135deg,#1a1420,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/k7PRZYYGbL5gUp8TzpRt/image.jpg",
        },
        {
          id: "p08",
          title: "Humayun Tomb",
          client: "Personal work",
          role: "Photographer",
          tools: "Mobile, Lightroom",
          year: "2026",
          orientation: "landscape",
          desc: "A polished portrait frame with controlled contrast and clean tones.",
          fill: "linear-gradient(135deg,#1a1420,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/x8pgBc16xsKb4z0p29Cy/image.png",
        },
        {
          id: "p09",
          title: "Golden Ratio",
          client: "Personal work",
          role: "Photographer",
          tools: "Camera, Lightroom",
          year: "2026",
          orientation: "landscape",
          desc: "A warm outdoor frame finished for color and depth.",
          fill: "linear-gradient(135deg,#241a10,#0B0C0E 60%)",
          image: "https://plain-apac-prod-public.komododecks.com/202608/30/r0DKLa4EpyVRPVUlusaO/image.png",
        },
      ],
      event: {
        "Independence Day Celebration": {
          date: "15 Aug 2026",
          items: [
            {
              id: "ID01",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "square",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID8.jpg",
            },
            {
              id: "ID02",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID1.jpg",
            },
            {
              id: "ID03",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "square",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID3.jpg",
            },
            {
              id: "ID04",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID10.jpg",
            },
            {
              id: "ID05",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID5.jpg",
            },
            {
              id: "ID06",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID6.jpg",
            },
            {
              id: "ID07",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID7.jpg",
            },
            {
              id: "ID08",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID2.jpg",
            },
            {
              id: "ID09",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID11.jpg",
            },
            {
              id: "ID10",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "square",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID4.jpg",
            },
            {
              id: "ID11",
              title: "Independence Day",
              role: "Event Photographer",
              tools: "Canon 1200D, 55-200mm",
              orientation: "landscape",
              desc: "_",
              fill: "linear-gradient(135deg,#241610,#0B0C0E 60%)",
              image: "/projects/Eventphotography/IndependenceDay/ID9.jpg",
            },            
          ],
        },
      },
      editing: [
        {
          id: "c01",
          title: "Portrait Retouch — Skin & Light",
          tools: "Photoshop, Lightroom",
          year: "2026",
          desc: "Frequency-separation skin retouching plus a re-lit background to match the subject's key light.",
          beforeFill: "linear-gradient(135deg,#3a3a38,#26251f 70%)",
          afterFill: "linear-gradient(135deg,#2a1414,#120a08 70%)",
          beforeImage: "projects/photoedit/photo0201.png",
          afterImage: "projects/photoedit/photo0202.png",
        },
        {
          id: "c02",
          title: "Product Cleanup — Background Swap",
          tools: "Photoshop",
          year: "2024",
          desc: "Clipped the product from a busy shelf shot and dropped it onto a seamless studio backdrop.",
          beforeFill: "linear-gradient(135deg,#2e2a24,#1a1712 70%)",
          afterFill: "linear-gradient(135deg,#141414,#0B0C0E 70%)",
        },
        {
          id: "c03",
          title: "Landscape Color Grade",
          tools: "Lightroom Classic",
          year: "2024",
          desc: "Recovered a flat, overcast coastline shot into a warmer golden-hour grade.",
          beforeFill: "linear-gradient(135deg,#2b2f33,#1c2024 70%)",
          afterFill: "linear-gradient(135deg,#3a2412,#160c06 70%)",
        },
        {
          id: "c04",
          title: "Event Photo — Exposure Recovery",
          tools: "Lightroom Classic",
          year: "2026",
          desc: "Pulled a badly underexposed indoor event frame back to a usable, natural-looking exposure.",
          beforeFill: "linear-gradient(135deg,#141414,#08080a 70%)",
          afterFill: "linear-gradient(135deg,#28221a,#141210 70%)",
        },
      ],
    },
  };

  var SERVICES = [
    // {
    //   name: "Motion Graphics",
    //   desc: "Kinetic type, animated logos, and short-form motion built to match a brand's existing voice.",
    //   tags: ["After Effects", "Premiere"],
    // },
    {
      name: "Video Editing & Color",
      desc: "Narrative and brand-film editing, from assembly cut through final grade.",
      tags: ["Premiere", "Davinci Resolve"],
    },
    {
      name: "Photo Editing",
      desc: "Thoughtful retouching, precise color, and the finishing touches that create a polished image.",
      tags: ["Lightroom", "Photoshop"],
    },
    // {
    //   name: "Print & Packaging",
    //   desc: "Layout and packaging design built to survive contact with an actual printer.",
    //   tags: ["InDesign", "Illustrator"],
    // },
    {
      name: "Event Photography",
      desc: "Documentary-style coverage for conferences, launches, and live shows.",
      tags: ["Canon 1200D", "Lightroom"],
    },
    {
      name: "Portrait & Product",
      desc: "Considered, lightly-directed portraits and product photography for small brands.",
      tags: ["Studio", "Natural light"],
    },
  ];

  /* ===============================================================
     2. RENDER — video cards, photo cards, event groups, compare
     cards, filmstrip, services. All read straight from WORK/SERVICES
     above, so editing the data is enough to change what's on screen.
     =============================================================== */
  var ORIENTATION_CLASS = {
    horizontal: "is-horizontal",
    vertical: "is-vertical",
    landscape: "is-landscape",
    portrait: "is-portrait",
    square: "is-square",
  };

  // Fades newly-rendered cards in. Used on every tab/mode switch since
  // the grids are re-rendered rather than scroll-triggered once.
  function animateCardsIn(container) {
    if (!container || prefersReducedMotion || typeof gsap === "undefined")
      return;
    var items = container.querySelectorAll(
      ".project-card, .compare-card, .event-group",
    );
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
    );
  }

  function mediaHTML(item, className, altText) {
    if (item.video) {
      return (
        '<video class="' +
        className +
        ' project-card-video" muted loop playsinline preload="metadata">' +
        '<source src="' +
        item.video +
        '" type="video/mp4">' +
        "</video>"
      );
    }

    if (item.image) {
      return (
        '<img class="' +
        className +
        '" loading="lazy" src="' +
        item.image +
        '" alt="' +
        (altText || "") +
        '">'
      );
    }

    return (
      '<div class="' +
      className +
      '" style="background:' +
      item.fill +
      '"></div>'
    );
  }

  function filmstripMediaHTML(item) {
    if (item.video) {
      return (
        '<video class="filmstrip-cell-fill" muted loop playsinline autoplay preload="metadata">' +
        '<source src="' +
        item.video +
        '" type="video/mp4">' +
        "</video>"
      );
    }

    if (item.image) {
      return (
        '<img class="filmstrip-cell-fill" loading="lazy" src="' +
        item.image +
        '" alt="">'
      );
    }

    return (
      '<div class="filmstrip-cell-fill" style="background:' +
      item.fill +
      '"></div>'
    );
  }

  function compareMediaLayerHTML(className, image, fill, altText) {
    if (image) {
      return (
        '<img class="' +
        className +
        '" src="' +
        image +
        '" alt="' +
        altText +
        '">'
      );
    }

    return (
      '<div class="' + className + '" style="background:' + fill + '"></div>'
    );
  }

  function initVideoPreviews(container) {
    container.querySelectorAll(".project-card-video").forEach(function (video) {
      var card = video.closest(".project-card");
      if (!card) return;

      function playPreview() {
        video.play().catch(function () {});
      }

      function pausePreview() {
        video.pause();
      }

      card.addEventListener("mouseenter", playPreview);
      card.addEventListener("mouseleave", pausePreview);
      card.addEventListener("focusin", playPreview);
      card.addEventListener("focusout", pausePreview);
    });
  }

  function videoCardHTML(v, idx) {
    return (
      '<article class="project-card" data-video-id="' +
      v.id +
      '" tabindex="0" ' +
      'data-cursor="link" role="button" aria-label="Play project: ' +
      v.title +
      '">' +
      '<div class="project-card-media ' +
      ORIENTATION_CLASS[v.orientation] +
      '">' +
      mediaHTML(v, "project-card-fill", v.title) +
      '<span class="project-card-play" aria-hidden="true"></span>' +
      '<span class="project-card-tag">' +
      (v.tagOverride || "Video") +
      "</span>" +
      '<span class="project-card-idx" data-mono>VID_' +
      String(idx + 1).padStart(2, "0") +
      "</span>" +
      '<span class="project-card-duration" data-mono>' +
      v.duration +
      "</span>" +
      '<div class="project-card-overlay">' +
      '<p class="project-card-title">' +
      v.title +
      "</p>" +
      '<p class="project-card-meta">' +
      v.client +
      " — " +
      v.year +
      "</p>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function photoCardHTML(p, idx, idxPrefix) {
    return (
      '<article class="project-card" data-photo-id="' +
      p.id +
      '" tabindex="0" ' +
      'data-cursor="link" role="button" aria-label="View photo: ' +
      p.title +
      '">' +
      '<div class="project-card-media ' +
      ORIENTATION_CLASS[p.orientation] +
      '">' +
      mediaHTML(p, "project-card-fill", p.title) +
      '<span class="project-card-idx" data-mono>' +
      idxPrefix +
      "_" +
      String(idx + 1).padStart(2, "0") +
      "</span>" +
      '<div class="project-card-overlay">' +
      '<p class="project-card-title">' +
      p.title +
      "</p>" +
      '<p class="project-card-meta">' +
      (p.client || p.role) +
      "</p>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderVideoGrid(subtab) {
    var grid = document.getElementById("videoGrid");
    var list = WORK.video[subtab];
    grid.innerHTML = list
      .map(function (v, i) {
        return videoCardHTML(v, i);
      })
      .join("");
    document.getElementById("videoCount").textContent =
      list.length + (list.length === 1 ? " video" : " videos");
    initVideoPreviews(grid);
    animateCardsIn(grid);
  }

  function renderPhotographyGrid() {
    var list = WORK.photo.photography;
    var html =
      '<div class="photo-grid" id="photoGrid">' +
      list
        .map(function (p, i) {
          return photoCardHTML(p, i, "PHO");
        })
        .join("") +
      "</div>";
    document.getElementById("photoPanelBody").innerHTML = html;
    document.getElementById("photoCount").textContent =
      list.length + (list.length === 1 ? " photo" : " photos");
    animateCardsIn(document.getElementById("photoPanelBody"));
  }

  function renderEventGrid() {
    var events = WORK.photo.event;
    var eventNames = Object.keys(events);
    var totalCount = 0;

    var html = eventNames
      .map(function (name, gi) {
        var group = events[name];
        totalCount += group.items.length;
        return (
          '<div class="event-group">' +
          '<div class="event-group-head">' +
          '<span class="event-group-idx" data-mono>' +
          String(gi + 1).padStart(2, "0") +
          "</span>" +
          '<span class="event-group-title">' +
          name +
          "</span>" +
          '<span class="event-group-date" data-mono>' +
          group.date +
          "</span>" +
          "</div>" +
          '<div class="photo-grid">' +
          group.items
            .map(function (p, i) {
              return photoCardHTML(p, i, "EVT");
            })
            .join("") +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    document.getElementById("photoPanelBody").innerHTML = html;
    document.getElementById("photoCount").textContent =
      eventNames.length + " events, " + totalCount + " photos";
    animateCardsIn(document.getElementById("photoPanelBody"));
  }

  function renderEditingCompare() {
    var list = WORK.photo.editing;
    var html =
      '<div class="compare-grid">' +
      list
        .map(function (c) {
          return (
            '<div class="compare-card">' +
            '<div class="compare-media" id="compareMedia-' +
            c.id +
            '">' +
            compareMediaLayerHTML(
              "compare-after",
              c.afterImage,
              c.afterFill,
              c.title + " after edit",
            ) +
            compareMediaLayerHTML(
              "compare-before",
              c.beforeImage,
              c.beforeFill,
              c.title + " before edit",
            ) +
            '<span class="compare-label compare-label--before" data-mono>BEFORE</span>' +
            '<span class="compare-label compare-label--after" data-mono>AFTER</span>' +
            '<div class="compare-handle"></div>' +
            "</div>" +
            '<input type="range" class="compare-range" min="0" max="100" value="50" ' +
            'aria-label="Drag to compare before and after for ' +
            c.title +
            '" ' +
            'data-compare-target="compareMedia-' +
            c.id +
            '">' +
            '<div class="compare-info">' +
            '<p class="compare-title">' +
            c.title +
            "</p>" +
            '<p class="compare-meta" data-mono>' +
            c.tools +
            " — " +
            c.year +
            "</p>" +
            "</div>" +
            "</div>"
          );
        })
        .join("") +
      "</div>";
    document.getElementById("photoPanelBody").innerHTML = html;
    document.getElementById("photoCount").textContent =
      list.length + " before / after pairs";
    animateCardsIn(document.getElementById("photoPanelBody"));
    initCompareSliders();
  }

  function renderFilmstrip() {
    var strip = document.getElementById("filmstrip");
    // Purely decorative highlight reel — photo frames only.
    var featured = WORK.photo.photography.slice(0, 6);
    var html = featured
      .map(function (item, i) {
        return (
          '<div class="filmstrip-cell" data-mono>' +
          filmstripMediaHTML(item) +
          '<span class="filmstrip-cell-label">' +
          String(i + 1).padStart(2, "0") +
          "</span>" +
          "</div>"
        );
      })
      .join("");
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

  renderVideoGrid("edits");
  renderPhotographyGrid();
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
      gsap.set(".reveal-up, .tools-grid > *, .services-list > *", {
        opacity: 1,
        y: 0,
      });
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
    gsap.utils.toArray(".tools-grid, .services-list").forEach(function (group) {
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
     8. WORK SECTION — discipline toggle (Video / Photography) +
     sub-tabs (Edits/Color, Photography/Event/Editing). Tracks which
     sub-tab is active so the lightbox knows which collection to
     page through with prev/next.
     =============================================================== */
  var workState = { mode: "video", videoSub: "edits", photoSub: "photography" };

  function positionModeIndicator(btn) {
    var indicator = document.getElementById("workModeIndicator");
    if (!btn || !indicator) return;
    indicator.style.width = btn.offsetWidth + "px";
    indicator.style.transform = "translateX(" + btn.offsetLeft + "px)";
  }

  function initWorkSection() {
    var modeButtons = document.querySelectorAll(".work-mode-btn");
    var panelVideo = document.getElementById("panelVideo");
    var panelPhoto = document.getElementById("panelPhoto");

    // Discipline toggle: Video Editing <-> Photography
    modeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.classList.contains("is-active")) return;
        modeButtons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        positionModeIndicator(btn);

        workState.mode = btn.dataset.mode;
        var showVideo = workState.mode === "video";
        panelVideo.hidden = !showVideo;
        panelPhoto.hidden = showVideo;
      });
    });

    // Position the sliding pill once layout is ready, and again on resize
    requestAnimationFrame(function () {
      positionModeIndicator(document.querySelector(".work-mode-btn.is-active"));
    });
    window.addEventListener("resize", function () {
      positionModeIndicator(document.querySelector(".work-mode-btn.is-active"));
    });

    // Video sub-tabs: Edits / Color Grading
    panelVideo.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        panelVideo.querySelectorAll(".tab-btn").forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        workState.videoSub = btn.dataset.subtab;
        renderVideoGrid(workState.videoSub);
      });
    });

    // Photography sub-tabs: Photography / Event Photography / Photo Editing
    panelPhoto.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        panelPhoto.querySelectorAll(".tab-btn").forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        workState.photoSub = btn.dataset.subtab;

        if (workState.photoSub === "photography") renderPhotographyGrid();
        else if (workState.photoSub === "event") renderEventGrid();
        else if (workState.photoSub === "editing") renderEditingCompare();
      });
    });
  }

  /* ===============================================================
     9. LIGHTBOX — shared by video and photography/event grids.
     Reads whichever collection is currently on screen (based on
     workState) so prev/next pages through what the person is
     actually looking at.
     =============================================================== */
  function getVideoCollection() {
    return WORK.video[workState.videoSub].map(function (v) {
      return {
        id: v.id,
        kind: "video",
        title: v.title,
        fill: v.fill,
        video: v.video,
        orientation: v.orientation,
        category:
          workState.videoSub === "edits"
            ? "Video — Edit"
            : "Video — Color Grade",
        desc: v.desc,
        meta: [
          { label: "Client", value: v.client },
          { label: "Role", value: v.role },
          { label: "Tools", value: v.tools },
          { label: "Duration", value: v.duration },
        ],
      };
    });
  }

  function findEventGroupContaining(photoId) {
    var events = WORK.photo.event;
    var names = Object.keys(events);
    for (var i = 0; i < names.length; i++) {
      var found = events[names[i]].items.some(function (item) {
        return item.id === photoId;
      });
      if (found) return { name: names[i], group: events[names[i]] };
    }
    return null;
  }

  function getPhotoCollection(anchorId) {
    if (workState.photoSub === "photography") {
      return WORK.photo.photography.map(function (p) {
        return {
          id: p.id,
          kind: "photo",
          title: p.title,
          fill: p.fill,
          image: p.image,
          orientation: p.orientation,
          category: "Photography",
          desc: p.desc,
          meta: [
            { label: "Role", value: p.role },
            { label: "Tools", value: p.tools },
            { label: "Year", value: p.year },
          ],
        };
      });
    }
    if (workState.photoSub === "event") {
      var match = findEventGroupContaining(anchorId);
      var eventName = match ? match.name : Object.keys(WORK.photo.event)[0];
      var group = WORK.photo.event[eventName];
      return group.items.map(function (p) {
        return {
          id: p.id,
          kind: "photo",
          title: p.title,
          fill: p.fill,
          image: p.image,
          orientation: p.orientation,
          category: "Event Photography — " + eventName,
          desc: p.desc,
          meta: [
            { label: "Role", value: p.role },
            { label: "Tools", value: p.tools },
            { label: "Event date", value: group.date },
          ],
        };
      });
    }
    return [];
  }

  function initLightbox() {
    var lightbox = document.getElementById("lightbox");
    var mediaEl = document.getElementById("lightboxMedia");
    var categoryEl = document.getElementById("lightboxCategory");
    var titleEl = document.getElementById("lightboxTitle");
    var descEl = document.getElementById("lightboxDesc");
    var metaEl = document.getElementById("lightboxMeta");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");
    var currentCollection = [];
    var currentIndex = 0;
    var lastFocused = null;

    function populate(index) {
      currentIndex =
        (index + currentCollection.length) % currentCollection.length;
      var item = currentCollection[currentIndex];

      mediaEl.style.background = item.fill || "";
      if (item.video) {
        mediaEl.innerHTML =
          "<video controls autoplay muted playsinline>" +
          '<source src="' +
          item.video +
          '" type="video/mp4">' +
          "</video>";
      } else if (item.image) {
        mediaEl.innerHTML =
          '<img src="' + item.image + '" alt="' + item.title + '">';
      } else {
        mediaEl.innerHTML = "";
      }
      mediaEl.classList.toggle(
        "is-vertical",
        item.orientation === "vertical" || item.orientation === "portrait",
      );
      mediaEl.classList.toggle("is-square", item.orientation === "square");
      categoryEl.textContent = item.category;
      titleEl.textContent = item.title;
      descEl.textContent = item.desc;
      metaEl.innerHTML = item.meta
        .map(function (m) {
          return "<div><dt>" + m.label + "</dt><dd>" + m.value + "</dd></div>";
        })
        .join("");
    }

    function open(collection, itemId) {
      currentCollection = collection;
      var index = currentCollection.findIndex(function (item) {
        return item.id === itemId;
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
      mediaEl.innerHTML = "";
      if (lastFocused) lastFocused.focus();
    }

    function handleGridActivate(e) {
      var videoCard = e.target.closest("[data-video-id]");
      var photoCard = e.target.closest("[data-photo-id]");
      if (videoCard) open(getVideoCollection(), videoCard.dataset.videoId);
      else if (photoCard)
        open(
          getPhotoCollection(photoCard.dataset.photoId),
          photoCard.dataset.photoId,
        );
    }

    document
      .getElementById("videoGrid")
      .addEventListener("click", handleGridActivate);
    document
      .getElementById("videoGrid")
      .addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          var card = e.target.closest("[data-video-id]");
          if (card) {
            e.preventDefault();
            open(getVideoCollection(), card.dataset.videoId);
          }
        }
      });

    // Photo panel body is re-rendered on tab switches, so delegate from
    // the stable parent rather than the (replaced) grid element itself
    document
      .getElementById("photoPanelBody")
      .addEventListener("click", handleGridActivate);
    document
      .getElementById("photoPanelBody")
      .addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          var card = e.target.closest("[data-photo-id]");
          if (card) {
            e.preventDefault();
            open(
              getPhotoCollection(card.dataset.photoId),
              card.dataset.photoId,
            );
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
     10. BEFORE / AFTER COMPARE SLIDERS (Photo Editing sub-tab)
     A native <input type="range"> drives a CSS custom property
     (--pos) that clips the "before" layer — this keeps the control
     fully keyboard- and screen-reader-accessible for free, while
     still supporting drag on desktop and touch on mobile.
     =============================================================== */
  function initCompareSliders() {
    document.querySelectorAll(".compare-range").forEach(function (range) {
      var media = document.getElementById(range.dataset.compareTarget);
      if (!media) return;
      function update() {
        media.style.setProperty("--pos", range.value + "%");
      }
      range.addEventListener("input", update);
      update();
    });
  }

  /* ===============================================================
     11. CONTACT FORM — Formspree
     SWAP: put your real Formspree endpoint here. Everything else
     (validation, states, success/error messaging) stays the same
     if you later move to a different backend — just point fetch()
     at your new URL and adjust the response check if needed.
     =============================================================== */
  var FORM_ENDPOINT = "https://formspree.io/f/xrpgbldz"; // <-- swap this

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
    initWorkSection();
    initLightbox();
    initContactForm();
    runPreloader();
  });
})();
