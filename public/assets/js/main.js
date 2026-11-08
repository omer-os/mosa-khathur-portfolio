/* Mosa Albayati — site interactions (jQuery) */
$(function () {
  "use strict";

  var $win = $(window), $body = $("body"), $html = $("html");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Year + Ankara local time ---------- */
  $("#year").text(new Date().getFullYear());
  function tick() {
    try { $("#clock").text(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }).format(new Date()) + " local"); }
    catch (e) { $("#clock").text(""); }
  }
  tick(); setInterval(tick, 30000);

  /* ---------- Header: transparent at top, glass once scrolled ---------- */
  var $hdr = $("#siteHeader"), darkHero = $hdr.data("dark") === 1 || $hdr.data("dark") === "1";
  var $dock = $("#dock"), $hero = $("#hero"), $contact = $("#contact");
  function onScroll() {
    var y = $win.scrollTop(), solid = y > 24;
    $hdr.toggleClass("hdr-solid", solid).toggleClass("hdr-dark", darkHero && !solid);
    // mobile floating CTA: after the hero, hidden again near the contact section
    var heroEnd = $hero.length ? $hero.outerHeight() * 0.7 : 420;
    var nearContact = $contact.length && (y + $win.height() > $contact.offset().top + 120);
    $dock.toggleClass("is-on", y > heroEnd && !nearContact);
  }
  $win.on("scroll resize", onScroll); onScroll();

  /* ---------- Mobile menu (circular reveal) ---------- */
  var $menu = $("#mobileMenu"), $menuBtn = $("#menuBtn"), menuTimer;
  function setMenu(open) {
    clearTimeout(menuTimer);
    if (open) {
      $menu.removeClass("menu-closing").addClass("menu-open");
      $html.css("overflow", "hidden");
      setTimeout(function () { $("#menuClose").trigger("focus"); }, 50);
    } else {
      $menu.removeClass("menu-open").addClass("menu-closing");
      $html.css("overflow", "");
      menuTimer = setTimeout(function () { $menu.removeClass("menu-closing"); }, 600);
    }
    $menuBtn.attr("aria-expanded", String(open));
  }
  $menuBtn.on("click", function () { setMenu(true); });
  $("#menuClose").on("click", function () { setMenu(false); $menuBtn.trigger("focus"); });
  $menu.on("click", "a", function () { setMenu(false); });
  $(document).on("keydown", function (e) { if (e.key === "Escape" && $menu.hasClass("menu-open")) setMenu(false); });
  $win.on("resize", function () { if ($win.width() >= 768 && $menu.hasClass("menu-open")) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  var $reveals = $(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { $(e.target).addClass("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    $reveals.each(function () { io.observe(this); });
  } else { $reveals.addClass("is-in"); }

  /* ---------- ECG traces (sized to their container, with a travelling sweep) ---------- */
  function drawEcg() {
    $(".ecg svg").each(function () {
      var $svg = $(this), sw = $svg.parent().data("stroke") || 2;
      var w = Math.max(120, Math.round($svg.width())), h = Math.max(24, Math.round($svg.height()));
      var base = h * 0.68, amp = h * 0.62, beat = Math.max(90, Math.min(240, w / 3.2));
      var shape = [[.30, 0], [.34, -.07], [.38, 0], [.44, 0], [.46, .06], [.49, -1], [.52, .32], [.55, 0], [.66, 0], [.72, -.16], [.78, 0], [1, 0]];
      var d = "M0 " + base.toFixed(1), x = 0;
      while (x < w) {
        for (var i = 0; i < shape.length; i++) {
          var px = Math.min(w, x + shape[i][0] * beat);
          d += " L" + px.toFixed(1) + " " + (px >= w ? base : base + shape[i][1] * amp).toFixed(1);
          if (px >= w) break;
        }
        x += beat;
      }
      $svg.attr({ viewBox: "0 0 " + w + " " + h, preserveAspectRatio: "none" });
      $svg.html('<path class="ecg-base" d="' + d + '" fill="none" stroke-width="1.2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
        '<path class="ecg-sweep" d="' + d + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>');
      var len = $svg.find(".ecg-sweep")[0].getTotalLength();
      $svg.find(".ecg-sweep").css({ "--len": len.toFixed(0) + "px", "--seg": Math.round(beat * 1.15) + "px", "--dur": Math.max(2.4, w / 160).toFixed(1) + "s" });
    });
  }
  drawEcg();
  var rT; $win.on("resize", function () { clearTimeout(rT); rT = setTimeout(drawEcg, 150); });

  /* ---------- Perfusion circuit (desktop) ---------- */
  var $nodes = $(".node"), $panels = $(".c-panel");
  function select(key) {
    var $p = $panels.filter("[data-panel='" + key + "']");
    if (!$p.length) return;
    $panels.not($p).addClass("hidden");
    if ($p.hasClass("hidden")) $p.removeClass("hidden").hide().fadeIn(200);
    $nodes.removeClass("is-active").attr("aria-pressed", "false").filter("[data-node='" + key + "']").addClass("is-active").attr("aria-pressed", "true");
  }
  $nodes.on("click", function () { select($(this).data("node")); })
        .on("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select($(this).data("node")); } });
  if (finePointer) $nodes.on("mouseenter", function () { select($(this).data("node")); });

  /* ---------- Soft page transitions ---------- */
  $(document).on("click", "a[href^='/']", function (e) {
    if (reduceMotion || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (this.hasAttribute("download") || this.target === "_blank") return;
    var href = $(this).attr("href"), url = new URL(href, location.href);
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    $body.addClass("is-leaving");
    setTimeout(function () { location.href = href; }, 220);
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
    $("#lbTitle").html($c.data("title")); $("#lbMeta").html($c.data("meta"));
    $("#lbCount").text(String(index + 1).padStart(2, "0") + " / " + String($certs.length).padStart(2, "0"));
  }
  $lbImg.on("load", function () { $(this).css({ transition: "opacity .35s ease", opacity: 1 }); });
  function openLb(i) { lastFocus = document.activeElement; show(i); $lb.removeClass("hidden").addClass("flex"); $html.css("overflow", "hidden"); $("#lbClose").trigger("focus"); }
  function closeLb() { $lb.addClass("hidden").removeClass("flex"); $html.css("overflow", ""); if (lastFocus) lastFocus.focus(); }
  $certs.on("click", function () { openLb($certs.index(this)); });
  $("#lbClose").on("click", closeLb);
  $("#lbPrev").on("click", function () { show(index - 1); });
  $("#lbNext").on("click", function () { show(index + 1); });
  $lb.on("click", function (e) { if (e.target === this || e.target.id === "lbStage") closeLb(); });
  $(document).on("keydown", function (e) {
    if ($lb.hasClass("hidden")) return;
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
