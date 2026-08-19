from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
for p in root.rglob("*.html"):
    t = p.read_text(encoding="utf-8")
    n = re.sub(r"site\.js\?v=[^\"]+", "site.js?v=20260813c", t)
    n = re.sub(r"style\.css\?v=[^\"]+", "style.css?v=20260813c", n)
    if n != t:
        p.write_text(n, encoding="utf-8")
        print("bumped", p.relative_to(root))

for name in ["index.html", "releases/index.html"]:
    text = (root / name).read_text(encoding="utf-8")
    ids = re.findall(
        r'href="(?:releases/)?([a-z0-9-]+)\.html" class="release-card',
        text,
    )
    print(name, "->", ids)
