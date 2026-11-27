"""Optional: refresh self-hosted fonts after adding substantial new copy.
Requires fonttools[woff] (Python); deployed servers do not need Python packages.
"""
from pathlib import Path
from urllib.request import urlopen
from io import BytesIO
from fontTools.ttLib import TTFont
from fontTools import subset

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/fonts'
OUT.mkdir(exist_ok=True)
TEXT = ''.join(p.read_text() for p in (ROOT / 'src').rglob('*')
               if p.is_file() and p.suffix in ['.tsx', '.ts'] and not p.name.startswith('._'))
FAMILIES = [
    ('instrument-serif-regular', 'instrumentserif', 'InstrumentSerif-Regular.ttf'),
    ('instrument-serif-italic', 'instrumentserif', 'InstrumentSerif-Italic.ttf'),
    ('inter', 'inter', 'Inter%5Bopsz,wght%5D.ttf'),
    ('space-grotesk', 'spacegrotesk', 'SpaceGrotesk%5Bwght%5D.ttf'),
    ('jetbrains-mono', 'jetbrainsmono', 'JetBrainsMono%5Bwght%5D.ttf'),
    ('noto-sans-sc', 'notosanssc', 'NotoSansSC%5Bwght%5D.ttf'),
]
for output, folder, filename in FAMILIES:
    origin = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{folder}/'
    font = TTFont(BytesIO(urlopen(origin + filename, timeout=60).read()))
    options = subset.Options()
    options.flavor = 'woff2'
    options.hinting = False
    worker = subset.Subsetter(options=options)
    worker.populate(text=TEXT)
    worker.subset(font)
    font.flavor = 'woff2'
    font.save(OUT / (output + '.woff2'))
    license_file = OUT / ('OFL-' + folder + '.txt')
    if not license_file.exists():
        license_file.write_bytes(urlopen(origin + 'OFL.txt', timeout=30).read())
    print(output, (OUT / (output + '.woff2')).stat().st_size)
