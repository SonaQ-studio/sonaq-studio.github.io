/**
 * Общая шапка и подвал для всех страниц SonaQ.
 * Базовый путь ("" или "../") определяется автоматически по URL.
 */
(function () {
  function getBase() {
    const path = (window.location.pathname || "").replace(/\\/g, "/");
    // /releases/... или /artist/... → на уровень выше
    if (/\/(releases|artist)(\/|$)/i.test(path)) return "../";
    return "";
  }

  const base = getBase();
  const home = base + "index.html";
  const artist = base + "artist/";
  const favicon = base + "favicon.png";

  const headerHtml = `
<nav class="site-nav" aria-label="Главное меню">
  <div class="nav-container">
    <a href="${home}" class="logo">SonaQ</a>
    <button type="button" class="nav-toggle" aria-label="Меню" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links">
      <a href="${home}#home">Главная</a>
      <a href="${home}#releases">Релизы</a>
      <a href="${artist}">Артист</a>
      <a href="${home}#about">О проекте</a>
      <a href="#contact">Контакты</a>
    </div>
  </div>
</nav>`;

  const footerHtml = `
<footer id="contact" class="site-footer">
  <div class="container footer-grid">
    <div class="footer-block">
      <p><strong>Контакты</strong></p>
      <p>
        <i class="fas fa-envelope"></i>
        <a href="mailto:sonaq.official@gmail.com">sonaq.official@gmail.com</a>
      </p>
      <p>
        <i class="fab fa-telegram"></i>
        Telegram:
        <a href="https://t.me/sonaqofficial" target="_blank" rel="noopener">@sonaqofficial</a>
      </p>
      <p>
        <i class="fab fa-youtube"></i>
        YouTube:
        <a href="https://youtube.com/@SonaQofficial" target="_blank" rel="noopener">@SonaQofficial</a>
      </p>
      <p>
        <i class="fab fa-vk"></i>
        VK:
        <a href="https://vk.com/sonaq.official" target="_blank" rel="noopener">SonaQ</a>
      </p>
      <p>
        <i class="fas fa-bolt"></i>
        Boosty:
        <a href="https://boosty.to/sonaq" target="_blank" rel="noopener">SonaQ</a>
      </p>
    </div>
    <div class="footer-block">
      <p><strong>Навигация</strong></p>
      <p><a href="${home}#home">Главная</a></p>
      <p><a href="${home}#releases">Релизы</a></p>
      <p><a href="${artist}">Страница артиста</a></p>
      <p><a href="${home}#about">О проекте</a></p>
    </div>
    <div class="footer-block footer-copy">
      <p class="logo footer-logo">SonaQ</p>
      <p>AI-generated cyberpunk &amp; experimental music</p>
      <p>&copy; 2026 SonaQ. Digital Hermit Music.</p>
    </div>
  </div>
</footer>`;

  function mount() {
    const headerSlot = document.getElementById("site-header");
    const footerSlot = document.getElementById("site-footer");

    if (headerSlot) {
      headerSlot.outerHTML = headerHtml;
    } else if (!document.querySelector("nav.site-nav, nav .nav-container")) {
      document.body.insertAdjacentHTML("afterbegin", headerHtml);
    }

    if (footerSlot) {
      footerSlot.outerHTML = footerHtml;
    } else if (!document.querySelector("footer.site-footer, footer#contact")) {
      document.body.insertAdjacentHTML("beforeend", footerHtml);
    }

    // Мобильное меню
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Подсветка активной ссылки (грубо)
    const path = (window.location.pathname || "").replace(/\\/g, "/");
    document.querySelectorAll(".nav-links a").forEach((a) => {
      try {
        const href = a.getAttribute("href") || "";
        if (path.includes("/artist") && href.includes("artist")) {
          a.classList.add("is-active");
        }
      } catch (_) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
