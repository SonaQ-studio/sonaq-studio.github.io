"""Rewrite homepage + releases index grids sorted by date (newest first)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CARDS = {
    "porog": {
        "title": 'Порог <span class="release-badge">(альбом)</span>',
        "sub": "7 треков · 28 августа 2026",
        "alt": "Порог",
        "img": "porog.jpg",
        "upcoming": True,
    },
    "belye-dzhedai": {
        "title": "Белые джедаи",
        "sub": (
            'Сингл · <span class="date-uncertain" '
            'title="Дата ориентировочная, может сдвинуться">21 августа 2026?</span>'
        ),
        "alt": "Белые джедаи",
        "img": "belye-dzhedai.jpg",
        "upcoming": True,
    },
    "pelmeni": {
        "title": "Пельмени",
        "sub": "4 августа 2026 — уже на площадках",
        "alt": "Пельмени",
        "img": "pelmeni.jpg",
    },
    "skazochnyy-memolog": {
        "title": "Сказочный мемолог",
        "sub": "30 июля 2026 — уже на площадках · 3 трека",
        "alt": "Сказочный мемолог",
        "img": "skazochnyy-memolog.jpg",
    },
    "8bitnaya-nostalgiya": {
        "title": "8битная настальгия",
        "sub": "EP · 3 трека · уже на площадках",
        "alt": "8битная настальгия",
        "img": "8bitnaya-nostalgiya.jpg",
    },
    "cifrovoe-zavtra": {
        "title": 'Digital Tomorrow <span class="release-badge">(альбом)</span>',
        "sub": "5 треков — 23 июля 2026",
        "alt": "Digital Tomorrow",
        "img": "cifrovoe-zavtra.jpg",
        "onerror": True,
    },
    "kod-v-moih-venah": {
        "title": "Цифровое завтра",
        "sub": "23 июля 2026 — уже на площадках",
        "alt": "Цифровое завтра",
        "img": "kod-v-moih-venah.jpg",
    },
    "elektro": {
        "title": "Электро",
        "sub": "14 июля 2026 — русские площадки",
        "alt": "Электро",
        "img": "elektro.jpg",
    },
    "zhit-druzhno": {
        "title": "Жить Дружно",
        "sub": "13 июля 2026 — русские площадки",
        "alt": "Жить Дружно",
        "img": "zhit-druzhno.jpg",
    },
    "cifrovoy-haos": {
        "title": "Цифровой Хаос",
        "sub": "10 июля 2026 — русские площадки",
        "alt": "Цифровой Хаос",
        "img": "cifrovoy-haos.jpg",
    },
}

ORDER = list(CARDS.keys())


def render(prefix: str, href_prefix: str, fallback_og: str) -> str:
    parts: list[str] = []
    for rid in ORDER:
        c = CARDS[rid]
        cls = "release-card release-card--upcoming" if c.get("upcoming") else "release-card"
        badge = (
            '                    <span class="release-card-badge-soon">скоро</span>\n'
            if c.get("upcoming")
            else ""
        )
        img = f"{prefix}{c['img']}"
        onerr = f" onerror=\"this.src='{fallback_og}'\"" if c.get("onerror") else ""
        href = f"{href_prefix}{rid}.html"
        parts.append(
            f"""                <a href="{href}" class="{cls}">
{badge}                    <div class="release-card-cover">
                        <img src="{img}" width="400" height="400" decoding="async" alt="{c['alt']}" loading="lazy"{onerr}>
                    </div>
                    <div class="release-card-body">
                        <h3>{c['title']}</h3>
                        <p>{c['sub']}</p>
                        <span class="release-more">Подробнее →</span>
                    </div>
                </a>"""
        )
    return "\n".join(parts)


def replace_grid(path: Path, grid_html: str) -> None:
    text = path.read_text(encoding="utf-8")
    m = re.search(r'<div class="releases-grid">', text)
    if not m:
        raise SystemExit(f"no grid in {path}")
    start = m.end()
    # find matching close of releases-grid: first </div> that closes it —
    # cards are <a>...</a>, so after last </a> comes </div>
    end = text.find("</div>", start)
    # need the outer grid close after all cards — walk depth
    i = start
    depth = 1
    while i < len(text) and depth:
        nxt_open = text.find("<div", i)
        nxt_close = text.find("</div>", i)
        if nxt_close < 0:
            raise SystemExit(f"unclosed grid in {path}")
        if nxt_open >= 0 and nxt_open < nxt_close:
            depth += 1
            i = nxt_open + 4
        else:
            depth -= 1
            if depth == 0:
                end = nxt_close
                break
            i = nxt_close + 6
    new = text[: m.start()] + '<div class="releases-grid">\n' + grid_html + "\n            </div>" + text[end + 6 :]
    for a, b in (
        ("style.css?v=20260813b", "style.css?v=20260813c"),
        ("style.css?v=20260805", "style.css?v=20260813c"),
        ("site.js?v=20260813b", "site.js?v=20260813c"),
        ("site.js?v=20260805", "site.js?v=20260813c"),
    ):
        new = new.replace(a, b)
    path.write_text(new, encoding="utf-8")
    print("ok", path.relative_to(ROOT))


def main() -> None:
    replace_grid(
        ROOT / "index.html",
        render("images/releases/thumbs/", "releases/", "og-image.jpg"),
    )
    replace_grid(
        ROOT / "releases" / "index.html",
        render("../images/releases/thumbs/", "", "../og-image.jpg"),
    )


if __name__ == "__main__":
    main()
