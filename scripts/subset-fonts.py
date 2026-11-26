"""Run: uv run --with fonttools --with brotli python scripts/subset-fonts.py"""
from pathlib import Path
from html import unescape
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
# Include markup, attributes, CSS-generated content, scripts, and printable ASCII.
characters = set(map(chr, range(32, 127)))
for pattern in ("*.html", "HTML/*.html", "CSS/*.css", "JS/*.js"):
    for path in ROOT.glob(pattern):
        characters.update(unescape(path.read_text(encoding="utf-8")))
codepoints = {ord(char) for char in characters}
before = after = 0
for source in sorted((ROOT / "CSS/assets").glob("*.woff2")):
    if ".subset." in source.name:
        continue
    target = source.with_name(source.stem + ".subset.woff2")
    with TTFont(source) as font:
        expected = codepoints.intersection(font.getBestCmap())
        options = subset.Options()
        options.layout_features = ["*"]
        worker = subset.Subsetter(options=options)
        worker.populate(unicodes=codepoints)
        worker.subset(font)
        font.flavor = "woff2"
        font.save(target)
    with TTFont(target) as check:
        assert expected.issubset(check.getBestCmap()), target
    before += source.stat().st_size
    after += target.stat().st_size
    print(f"{source.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes")
print(f"Total: {before:,} -> {after:,} bytes ({1 - after / before:.1%} reduction)")
