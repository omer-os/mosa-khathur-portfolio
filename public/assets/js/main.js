/* Mosa Albayati — site interactions (jQuery) */
$(function () {
  "use strict";

  var $win = $(window);
  var $body = $("body");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $("#year").text(new Date().getFullYear());

  /* ---------- Header hairline once scrolled ---------- */
  var $header = $("#siteHeader");
  function onScroll() { $header.toggleClass("border-line", $win.scrollTop() > 8).toggleClass("border-transparent", $win.scrollTop() <= 8); }
  $win.on("scroll", onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  var $menu = $("#mobileMenu");
  function setMenu(open) {
    $menu.toggleClass("hidden", !open).toggleClass("flex", open);
    $("#menuBtn").attr("aria-expanded", String(open));
    $body.css("overflow", open ? "hidden" : "");
    if (open) $("#menuClose").trigger("focus"); else $("#menuBtn").trigger("focus");
  }
  $("#menuBtn").on("click", function () { setMenu(true); });
  $("#menuClose").on("click", function () { setMenu(false); });
  $menu.on("click", "a", function () { setMenu(false); });
  $win.on("resize", function () { if ($win.width() >= 768 && !$menu.hasClass("hidden")) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var $reveals = $(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { $(e.target).addClass("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    $reveals.each(function () { io.observe(this); });
  } else {
    $reveals.addClass("is-in");
  }

  /* ---------- ECG line: drawn to fit its width, with a travelling sweep ---------- */
  function drawEcg() {
    $(".ecg svg").each(function () {
      var $svg = $(this);
      var w = Math.max(320, Math.round($svg.width()));
      var h = 56, base = 38, beat = w < 640 ? 170 : 240;
      var d = "M0 " + base, x = 0;
      // one PQRST complex, relative to the start of each beat
      var shape = [[.30, 0], [.34, -4], [.38, 0], [.44, 0], [.46, 3], [.49, -34], [.52, 14], [.55, 0], [.66, 0], [.72, -7], [.78, 0], [1, 0]];
      while (x < w) {
        for (var i = 0; i < shape.length; i++) {
          var px = Math.min(w, x + shape[i][0] * beat);
          d += " L" + px.toFixed(1) + " " + (base + (px >= w ? 0 : shape[i][1]));
          if (px >= w) break;
        }
        x += beat;
      }
      $svg.attr({ viewBox: "0 0 " + w + " " + h, preserveAspectRatio: "none" });
      $svg.html(
        '<path class="ecg-base" d="' + d + '" fill="none" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        '<path class="ecg-sweep" d="' + d + '" fill="none" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>'
      );
      var len = $svg.find(".ecg-sweep")[0].getTotalLength();
      $svg.find(".ecg-sweep").css({ "--len": len.toFixed(0) + "px", "--seg": Math.round(beat * 1.1) + "px", "--dur": (w / 160).toFixed(1) + "s" });
    });
  }
  drawEcg();
  var resizeT;
  $win.on("resize", function () { clearTimeout(resizeT); resizeT = setTimeout(drawEcg, 150); });

  /* ---------- Soft page transitions between internal pages ---------- */
  $(document).on("click", "a[href^='/']", function (e) {
    var href = $(this).attr("href");
    if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (this.hasAttribute("download") || this.target === "_blank") return;
    var url = new URL(href, location.href);
    if (url.pathname === location.pathname) return; // same-page anchors scroll normally
    e.preventDefault();
    $body.addClass("is-leaving");
    setTimeout(function () { location.href = href; }, 260);
  });
  $win.on("pageshow", function () { $body.removeClass("is-leaving"); });

  /* ---------- Certificate lightbox ---------- */
  var $lb = $("#lightbox");
  if (!$lb.length) return;
  var $lbImg = $("#lbImg"), $certs = $(".cert"), index = 0, lastFocus = null;

  function show(i) {
    index = (i + $certs.length) % $certs.length;
    var $c = $certs.eq(index);
    $lbImg.css("opacity", 0).attr({ src: $c.data("src"), alt: $c.find("img").attr("alt") });
    $("#lbTitle").html($c.data("title"));
    $("#lbMeta").html($c.data("meta"));
    $("#lbCount").text(String(index + 1).padStart(2, "0") + " / " + String($certs.length).padStart(2, "0"));
  }
  $lbImg.on("load", function () { $(this).css({ transition: "opacity .4s ease", opacity: 1 }); });

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
  $lb.on("click", function (e) { if (e.target === this || $(e.target).is(".wrap:has(#lbImg)")) closeLb(); });

  $(document).on("keydown", function (e) {
    if ($lb.hasClass("hidden")) {
      if (e.key === "Escape" && !$menu.hasClass("hidden")) setMenu(false);
      return;
    }
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
    else if (e.key === "Tab") {
      var $f = $lb.find("button"), first = $f.first()[0], last = $f.last()[0];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var startX = null;
  $lb.on("touchstart", function (e) { startX = e.originalEvent.touches[0].clientX; });
  $lb.on("touchend", function (e) {
    if (startX === null) return;
    var dx = e.originalEvent.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
});
