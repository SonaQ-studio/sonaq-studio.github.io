"""Generate thumbs/ and rewrite card imgs to use them. Run from WWW/."""
from __future__ import annotations

import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
REL = ROOT / "images" / "releases"
THUMBS = REL / "thumbs"


def make_thumbs() -> None:
    THUMBS.mkdir(exist_ok=True)
    for p in sorted(REL.glob("*.jpg")):
        im = Image.open(p).convert("RGB")
        w, h = im.size
        t = im.copy()
        t.thumbnail((400, 400), Image.Resampling.LANCZOS)
        tp = THUMBS / p.name
        t.save(tp, "JPEG", quality=80, optimize=True, progressive=True)
        m = im.copy()
        m.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
        if w > 1000 or p.stat().st_size > 200_000:
            m.save(p, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"{p.name}: full {p.stat().st_size // 1024}KB, thumb {tp.stat().st_size // 1024}KB")


def rewrite_cards(path: Path) -> None:
    text = path.read_text(encoding="utf-8")

    def repl(m: re.Match) -> str:
        src, rest = m.group(1), m.group(2)
        if "/thumbs/" in src or "images/releases/" not in src:
            return m.group(0)
        new = src.replace("images/releases/", "images/releases/thumbs/")
        attrs = rest
        if "loading=" not in attrs:
            attrs = ' loading="lazy"' + attrs
        if "decoding=" not in attrs:
            attrs = ' decoding="async"' + attrs
        if "width=" not in attrs:
            attrs = ' width="400" height="400"' + attrs
        return f'src="{new}"{attrs}>'

    text2 = re.sub(r'src="([^"]*images/releases/[^"]+)"([^>]*)>', repl, text)
    path.write_text(text2, encoding="utf-8")
    print("rewrote", path.relative_to(ROOT))


def main() -> None:
    make_thumbs()
    rewrite_cards(ROOT / "index.html")
    rewrite_cards(ROOT / "releases" / "index.html")
    artist = ROOT / "artist" / "index.html"
    t = artist.read_text(encoding="utf-8")
    t = t.replace(
        'src="../og-image.jpg" alt="SonaQ" width="120" height="120"',
        'src="../images/avatar.jpg" alt="SonaQ" width="120" height="120" loading="lazy" decoding="async"',
    )
    artist.write_text(t, encoding="utf-8")
    print("artist avatar ok")


if __name__ == "__main__":
    main()
