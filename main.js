/* Swayam Desai — portfolio interactions. Vanilla JS, no deps. */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Sticky nav shadow */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.getElementById("navToggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* Render hero metrics (static — no gimmicky count-up) */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var sep = el.getAttribute("data-sep") === "1";
    el.textContent = format(target, dec, sep);
  }
  function format(n, dec, sep) {
    var s = dec > 0 ? n.toFixed(dec) : Math.round(n).toString();
    if (sep) {
      var parts = s.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      s = parts.join(".");
    }
    return s;
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* Active nav link on scroll (home page only) */
  var sections = ["work", "skills", "about", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var links = {};
  document.querySelectorAll(".nav-links a[href^='#']").forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  if (sections.length && "IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.values(links).forEach(function (l) { l.classList.remove("active"); });
          if (links[e.target.id]) links[e.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
