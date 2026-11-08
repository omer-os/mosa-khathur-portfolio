/* Mosa Albayati — portfolio interactions (jQuery) */
$(function () {
  "use strict";

  var $win = $(window);
  var $doc = $(document);
  var $body = $("body");

  /* ---------- Footer year ---------- */
  $("#year").text(new Date().getFullYear());

  /* ---------- Mobile menu ---------- */
  var $menu = $("#mobileMenu");
  var $menuBtn = $("#menuBtn");

  function setMenu(open) {
    $menu.toggleClass("hidden", !open);
    $menuBtn.attr({ "aria-expanded": String(open), "aria-label": open ? "Close menu" : "Open menu" });
    $menuBtn.find(".menu-open").toggleClass("hidden", open);
    $menuBtn.find(".menu-close").toggleClass("hidden", !open);
  }
  $menuBtn.on("click", function () { setMenu($menu.hasClass("hidden")); });
  $menu.on("click", "a", function () { setMenu(false); });
  $win.on("resize", function () { if ($win.width() >= 768) setMenu(false); });

  /* ---------- Scroll reveal ---------- */
  var $reveals = $(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { $(e.target).addClass("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $reveals.each(function () { io.observe(this); });
  } else {
    $reveals.addClass("is-in");
  }

  /* ---------- Active nav link on scroll ---------- */
  var $links = $("nav .nav-link");
  var sections = $links.map(function () { return $($(this).attr("href"))[0]; }).get();

  function updateActive() {
    var y = $win.scrollTop() + $win.height() * 0.35;
    var current = null;
    sections.forEach(function (s) { if (s && $(s).offset().top <= y) current = s.id; });
    $links.each(function () {
      var on = $(this).attr("href") === "#" + current;
      $(this).toggleClass("is-active", on);
      if (on) { $(this).attr("aria-current", "true"); } else { $(this).removeAttr("aria-current"); }
    });
  }

  var ticking = false;
  $win.on("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { updateActive(); ticking = false; });
  });
  updateActive();

  /* ---------- Certificate lightbox ---------- */
  var $lb = $("#lightbox");
  var $lbImg = $("#lbImg");
  var $certs = $(".cert");
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + $certs.length) % $certs.length;
    var $c = $certs.eq(index);
    $lbImg.attr({ src: $c.data("src"), alt: $c.find("img").attr("alt") });
    $("#lbTitle").text($c.data("title"));
    $("#lbMeta").text($c.data("meta"));
    $("#lbCount").text((index + 1) + " / " + $certs.length);
  }

  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    $lb.removeClass("hidden").addClass("flex");
    $body.css("overflow", "hidden");
    $("#lbClose").trigger("focus");
  }

  function closeLb() {
    $lb.addClass("hidden").removeClass("flex");
    $body.css("overflow", "");
    if (lastFocus) lastFocus.focus();
  }

  $certs.on("click", function () { openLb($certs.index(this)); });
  $("#lbClose").on("click", closeLb);
  $("#lbPrev").on("click", function () { show(index - 1); });
  $("#lbNext").on("click", function () { show(index + 1); });
  $lb.on("click", function (e) { if (e.target === this) closeLb(); });

  $doc.on("keydown", function (e) {
    if ($lb.hasClass("hidden")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
    else if (e.key === "Tab") {
      // keep focus inside the dialog
      var $f = $lb.find("button");
      var first = $f.first()[0], last = $f.last()[0];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Swipe on touch devices
  var startX = null;
  $lb.on("touchstart", function (e) { startX = e.originalEvent.touches[0].clientX; });
  $lb.on("touchend", function (e) {
    if (startX === null) return;
    var dx = e.originalEvent.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  /* ---------- Nav shadow on scroll ---------- */
  var $nav = $("header nav");
  $win.on("scroll", function () { $nav.toggleClass("shadow-lift", $win.scrollTop() > 20); });
});
