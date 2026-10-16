from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1] / 'apps/web/public'
cards = {
    'sentinel-aml': ('Sentinel AML', 'AI workflows. Evidence you can trace.', 'sentinel'),
    'cinebook': ('CineBook', 'One seat. One winning request.', 'cinebook'),
    'campusmate': ('CampusMate', 'A campus, made easier to explore.', 'campusmate'),
    'smart-helmet': ('Smart Helmet', 'From sensor signals to a useful alert.', None),
    'operator-assistant': ('Operator Assistant', 'Grounded guidance for complex workflows.', None),
    'dincharya': ('Dincharya', 'Digital utility with a tactile feel.', None),
    'dependency-risk': ('Dependency Risk', 'Security findings with context.', None),
}
for slug, (title, subtitle, source) in cards.items():
    image = Image.new('RGB', (1200, 630), '#0c0f12')
    draw = ImageDraw.Draw(image)
    font = lambda size: ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', size)
    draw.text((60, 45), 'mayank. / SELECTED WORK', font=font(23), fill='#77eed1')
    draw.text((60, 205), title, font=font(56), fill='#ecf0ef')
    draw.text((65, 310), subtitle, font=font(23), fill='#959fa7')
    draw.text((65, 530), 'MAYANK GUPTA / SOFTWARE DEVELOPER', font=font(18), fill='#77eed1')
    if source:
        preview = Image.open(root / f'images/{source}.webp').convert('RGB')
        preview.thumbnail((460, 390))
        image.paste(preview, (710+(440-preview.width)//2, 160))
    else:
        for index in range(4):
            y = 160+index*70
            draw.rounded_rectangle((860, y, 1140, y+50), radius=10, outline='#324a45', width=2)
    (root / 'social').mkdir(exist_ok=True)
    image.save(root / f'social/{slug}.png')
print('Prepared 7 project-specific social cards.')
