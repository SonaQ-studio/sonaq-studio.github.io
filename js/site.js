/**
 * Общая шапка, подвал и список «Другие релизы» для SonaQ.
 * base path ("" | "../") — по URL.
 *
 * Аналитика: впиши ID ниже. Пустая строка = не подключать.
 * Яндекс.Метрика: https://metrika.yandex.ru/ → номер счётчика (цифры)
 * Google Analytics 4: https://analytics.google.com/ → Measurement ID (G-XXXXXXXX)
 */
(function () {
  var ASSET_V = "20260723";

  // === Аналитика (официальный код Метрики) ===
  var YANDEX_METRIKA_ID = "110894233";
  var GA_MEASUREMENT_ID = ""; // Google не подключаем

  function loadYandexMetrika(id) {
    if (!id) return;
    // Как в кабинете Яндекс.Метрики
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=" + id, "ym");

    window.ym(Number(id), "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });

    var noscript = document.createElement("noscript");
    noscript.innerHTML =
      '<div><img src="https://mc.yandex.ru/watch/' +
      id +
      '" style="position:absolute;left:-9999px;" alt="" /></div>';
    document.body.appendChild(noscript);
  }

  function loadGoogleAnalytics(id) {
    if (!id) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", id);
  }

  function initAnalytics() {
    try {
      loadYandexMetrika(YANDEX_METRIKA_ID);
      loadGoogleAnalytics(GA_MEASUREMENT_ID);
    } catch (e) {
      /* ignore analytics errors */
    }
  }

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
    { id: "kod-v-moih-venah", title: "Цифровое завтра", href: "kod-v-moih-venah.html" },
    { id: "cifrovoe-zavtra", title: "Digital Tomorrow (альбом)", href: "cifrovoe-zavtra.html" },
    { id: "8bitnaya-nostalgiya", title: "8битная настальгия", href: "8bitnaya-nostalgiya.html" },
    { id: "skazochnyy-memolog", title: "Сказочный мемолог", href: "skazochnyy-memolog.html" }
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
    initAnalytics();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  // expose for debugging
  window.SonaQ = { base: base, releases: RELEASES, assetV: ASSET_V };
})();
