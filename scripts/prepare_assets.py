"""Prepare public project screenshots, fonts, resume and share artwork."""
from pathlib import Path
from urllib.request import Request, urlopen
import io, re, shutil
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
public = root / 'apps/web/public'
(public / 'images').mkdir(parents=True, exist_ok=True)
(public / 'fonts').mkdir(parents=True, exist_ok=True)
(public / 'social').mkdir(parents=True, exist_ok=True)
sources = {
    'sentinel': ('Sentinel-AML', 'docs/screenshots/command-center.png'),
    'cinebook': ('ticket-booking', 'output/playwright/readme/01-home-dark.jpg'),
    'campusmate': ('Campus-Mate', 'assets/images/IMG_0395.jpeg'),
}
def read(url):
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(req, timeout=35) as response:
        return response.read()

for name, (repo, path) in sources.items():
    target = public / 'images' / f'{name}.webp'
    if target.exists():
        print(f'Already prepared: {name}')
        continue
    url = f'https://raw.githubusercontent.com/Mayank2142/{repo}/main/{path}'
    try:
        img = Image.open(io.BytesIO(read(url))).convert('RGB')
        img.thumbnail((1400, 1600))
        img.save(target, 'WEBP', quality=88)
        print(f'Prepared {name}: {img.size}')
    except Exception as error:
        print(f'Asset unavailable {name}: {error}')

font_sources = {
    'manrope-variable.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf',
    'mono-regular.ttf': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf',
    'Manrope-OFL.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt',
    'IBMPlexMono-OFL.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt',
}
for name, url in font_sources.items():
    target = public / 'fonts' / name
    try:
        target.write_bytes(read(url))
        print(f'Prepared font asset: {name}')
    except Exception as error:
        print(f'Font source unavailable {name}: {error}')

shutil.copyfile('D:/IBM cyber/Resum.pdf', public / 'resume.pdf')
img = Image.new('RGB', (1200, 630), '#0c0f12')
draw = ImageDraw.Draw(img)
def font(size):
    return ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', size)
for x in range(680, 1170, 25):
    for y in range(70, 580, 25):
        draw.ellipse((x, y, x+2, y+2), fill='#28332f')
draw.text((65, 45), 'mayank.', font=font(34), fill='#77eed1')
draw.text((65, 170), 'Built with intent.', font=font(70), fill='#ecf0ef')
draw.text((65, 265), 'Engineered to last.', font=font(70), fill='#a3aea9')
draw.text((70, 460), 'MAYANK GUPTA  /  FULL-STACK + AI SYSTEMS', font=font(20), fill='#77eed1')
draw.line((70, 540, 1130, 540), fill='#273038')
draw.text((70, 563), 'Selected work, technical decisions, and a little curiosity.', font=font(20), fill='#959fa7')
img.save(public / 'social/portfolio.png')
print('Prepared resume and social artwork.')
