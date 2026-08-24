/* Swayam Desai — portfolio. Three small jobs, nothing more. */
(function () {
  "use strict";

  /* 1. Hairline under the nav once the page moves */
  var nav = document.getElementById("nav");
  if (nav && !nav.classList.contains("scrolled")) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 2. Mobile menu */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 3. Project cards: click flips to the detail face.
        Front and back are both in the DOM, so the text is indexable and
        selectable; only the hidden face is taken out of the a11y tree. */
  var cards = document.querySelectorAll("[data-card]");
  cards.forEach(function (card) {
    var front = card.querySelector(".wc-front");
    var back = card.querySelector(".wc-back");
    var toggle = card.querySelector(".wc-toggle");
    var close = card.querySelector(".wc-close");
    if (!front || !back || !toggle) return;

    var sync = function (open) {
      card.classList.toggle("flipped", open);
      toggle.setAttribute("aria-expanded", String(open));
      back.setAttribute("aria-hidden", String(!open));
      front.setAttribute("aria-hidden", String(open));
      // keep hidden faces off the tab order
      back.querySelectorAll("a, button").forEach(function (el) {
        el.tabIndex = open ? 0 : -1;
      });
      toggle.tabIndex = open ? -1 : 0;
    };
    sync(false);

    var open = function () { sync(true); var l = back.querySelector("a, button"); if (l) l.focus(); };
    var shut = function (refocus) { sync(false); if (refocus) toggle.focus(); };

    // the whole front is a target, but a real link inside it still wins.
    // On small screens the detail expands in place, so tapping again closes it.
    front.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      if (card.classList.contains("flipped")) shut(false); else open();
    });
    if (close) close.addEventListener("click", function (e) { e.stopPropagation(); shut(true); });

    card.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && card.classList.contains("flipped")) shut(true);
    });
  });

  /* 4. One fade-in per block. Reduced motion is honored in CSS. */
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* 5. Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
