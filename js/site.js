/**
 * Общая шапка, подвал и список «Другие релизы» для SonaQ.
 * base path ("" | "../") — по URL.
 */
(function () {
  var ASSET_V = "20260720";

  function getBase() {
    var path = (window.location.pathname || "").replace(/\\/g, "/");
    if (/\/(releases|artist)(\/|$)/i.test(path)) return "../";
    return "";
  }

  var base = getBase();
  var home = base + "index.html";
  var artist = base + "artist/";
  var releasesIndex = base + "releases/";

  /** Единый каталог релизов (для карточек «другие» и т.п.) */
  var RELEASES = [
    { id: "cifrovoy-haos", title: "Цифровой Хаос", href: "cifrovoy-haos.html" },
    { id: "zhit-druzhno", title: "Жить Дружно", href: "zhit-druzhno.html" },
    { id: "elektro", title: "Электро", href: "elektro.html" },
    { id: "kod-v-moih-venah", title: "Код в моих венах", href: "kod-v-moih-venah.html" },
    { id: "cifrovoe-zavtra", title: "Цифровое Завтра", href: "cifrovoe-zavtra.html" }
  ];

  var headerHtml =
    '<nav class="site-nav" aria-label="Главное меню">' +
    '<div class="nav-container">' +
    '<a href="' + home + '" class="logo">SonaQ</a>' +
    '<button type="button" class="nav-toggle" aria-label="Меню" aria-expanded="false">' +
    "<span></span><span></span><span></span>" +
    "</button>" +
    '<div class="nav-links">' +
    '<a href="' + home + '#home">Главная</a>' +
    '<a href="' + releasesIndex + '">Релизы</a>' +
    '<a href="' + artist + '">Артист</a>' +
    '<a href="' + home + '#about">О проекте</a>' +
    '<a href="#contact">Контакты</a>' +
    "</div></div></nav>";

  var footerHtml =
    '<footer id="contact" class="site-footer">' +
    '<div class="container footer-grid">' +
    '<div class="footer-block">' +
    "<p><strong>Контакты</strong></p>" +
    '<p><i class="fas fa-envelope"></i> <a href="mailto:sonaq.official@gmail.com">sonaq.official@gmail.com</a></p>' +
    '<p><i class="fab fa-telegram"></i> Telegram: <a href="https://t.me/sonaqofficial" target="_blank" rel="noopener">@sonaqofficial</a></p>' +
    '<p><i class="fab fa-youtube"></i> YouTube: <a href="https://youtube.com/@SonaQofficial" target="_blank" rel="noopener">@SonaQofficial</a></p>' +
    '<p><i class="fab fa-vk"></i> VK: <a href="https://vk.com/sonaq.official" target="_blank" rel="noopener">SonaQ</a></p>' +
    '<p><i class="fas fa-bolt"></i> Boosty: <a href="https://boosty.to/sonaq" target="_blank" rel="noopener">SonaQ</a></p>' +
    "</div>" +
    '<div class="footer-block">' +
    "<p><strong>Навигация</strong></p>" +
    '<p><a href="' + home + '#home">Главная</a></p>' +
    '<p><a href="' + releasesIndex + '">Релизы</a></p>' +
    '<p><a href="' + artist + '">Страница артиста</a></p>' +
    '<p><a href="' + home + '#about">О проекте</a></p>' +
    "</div>" +
    '<div class="footer-block footer-copy">' +
    '<p class="logo footer-logo">SonaQ</p>' +
    "<p>AI-generated cyberpunk &amp; experimental music</p>" +
    "<p>&copy; 2026 SonaQ. Digital Hermit Music.</p>" +
    "</div></div></footer>";

  function currentReleaseId() {
    var path = (window.location.pathname || "").replace(/\\/g, "/");
    var m = path.match(/\/releases\/([^/]+?)(?:\.html)?\/?$/i);
    if (!m) return null;
    return m[1].replace(/\.html$/i, "");
  }

  function fillOtherReleases() {
    var slots = document.querySelectorAll("[data-other-releases]");
    if (!slots.length) return;
    var cur = currentReleaseId();
    var html = "";
    RELEASES.forEach(function (r) {
      if (cur && r.id === cur) return;
      html +=
        '<a href="' +
        r.href +
        '" class="other-release">' +
        r.title +
        "</a>";
    });
    slots.forEach(function (slot) {
      var grid = slot.querySelector(".other-releases-grid") || slot;
      if (grid.classList && grid.classList.contains("other-releases-grid")) {
        grid.innerHTML = html;
      } else {
        slot.innerHTML =
          '<h3>Другие релизы</h3><div class="other-releases-grid">' +
          html +
          "</div>";
      }
    });
  }

  function mount() {
    var headerSlot = document.getElementById("site-header");
    var footerSlot = document.getElementById("site-footer");

    if (headerSlot) headerSlot.outerHTML = headerHtml;
    else if (!document.querySelector("nav.site-nav")) {
      document.body.insertAdjacentHTML("afterbegin", headerHtml);
    }

    if (footerSlot) footerSlot.outerHTML = footerHtml;
    else if (!document.querySelector("footer.site-footer")) {
      document.body.insertAdjacentHTML("beforeend", footerHtml);
    }

    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    var path = (window.location.pathname || "").replace(/\\/g, "/");
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (path.includes("/artist") && href.includes("artist")) a.classList.add("is-active");
      if (path.includes("/releases") && href.includes("releases") && !href.includes("#")) {
        a.classList.add("is-active");
      }
    });

    fillOtherReleases();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  // expose for debugging
  window.SonaQ = { base: base, releases: RELEASES, assetV: ASSET_V };
})();
