from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "assets" / "projects" / "slides"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1600, 900
BG = (7, 7, 7)
PANEL = (14, 14, 14)
LINE = (255, 106, 0)
MUTED = (180, 174, 164)
INK = (244, 239, 230)
HOT = (255, 138, 31)


def font(size, bold=False):
    names = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def rounded(draw, box, r, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def chrome(draw):
    rounded(draw, (48, 36, W - 48, H - 36), 18, PANEL, (40, 40, 40), 2)
    draw.ellipse((72, 58, 90, 76), fill=(255, 90, 80))
    draw.ellipse((100, 58, 118, 76), fill=(255, 190, 70))
    draw.ellipse((128, 58, 146, 76), fill=(80, 200, 110))
    draw.text((172, 54), "Campus DevCen  ·  formación virtual", font=font(22), fill=MUTED)


def draw_lobby():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    chrome(d)
    d.text((80, 108), "Ingreso a salas virtuales", font=font(36, True), fill=INK)
    d.text(
        (80, 156),
        "Elegí la sala. No hay aula física: el curso se dicta en vivo y queda registrado.",
        font=font(20),
        fill=MUTED,
    )

    rooms = [
        ("Seguridad", "ISO 45001", "Sala virtual de SST", (36, 48, 58)),
        ("Calidad", "ISO 9001", "Sala virtual de procesos", (28, 32, 40)),
        ("Medio Ambiente", "ISO 14001", "Sala virtual de gestión ambiental", (22, 38, 32)),
    ]
    x0, y0, card_w, card_h, gap = 80, 230, 460, 520, 30
    for i, (title, iso, sub, tint) in enumerate(rooms):
        x = x0 + i * (card_w + gap)
        rounded(d, (x, y0, x + card_w, y0 + card_h), 14, (10, 10, 10), LINE if i == 1 else (55, 48, 40), 2)
        # fake video preview
        rounded(d, (x + 18, y0 + 18, x + card_w - 18, y0 + 250), 10, tint, None)
        for col in range(2):
            for row in range(2):
                px = x + 40 + col * 200
                py = y0 + 40 + row * 96
                rounded(d, (px, py, px + 172, py + 82), 6, (18, 18, 18))
                d.ellipse((px + 72, py + 18, px + 100, py + 46), outline=LINE, width=2)
        d.text((x + 28, y0 + 276), title, font=font(30, True), fill=INK)
        d.text((x + 28, y0 + 320), iso, font=font(16), fill=HOT)
        d.text((x + 28, y0 + 352), sub, font=font(18), fill=MUTED)
        d.text((x + 28, y0 + 392), "12 en sala  ·  sesión en vivo", font=font(15), fill=(140, 134, 124))
        btn = (x + 28, y0 + 440, x + card_w - 28, y0 + 488)
        rounded(d, btn, 4, LINE if i != 2 else (28, 28, 28), LINE, 1)
        label = "Ingresar a la sala" if i != 2 else "Próxima sesión 18:00"
        d.text((x + 118 if i != 2 else x + 108, y0 + 452), label, font=font(18, True), fill=(20, 8, 0) if i != 2 else HOT)
    img.save(OUT / "campus-rooms.png", quality=92)


def draw_session():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    chrome(d)
    d.rectangle((70, 96, 1530, 148), fill=(18, 18, 18))
    d.text((88, 108), "En sala  ·  Calidad  ·  ISO 9001", font=font(22, True), fill=INK)
    d.text((1080, 112), "Seguridad    Calidad    Medio Ambiente", font=font(16), fill=MUTED)
    d.rectangle((1288, 140, 1368, 144), fill=LINE)

    # shared slide
    rounded(d, (80, 172, 1120, 760), 10, (16, 16, 16), (50, 44, 38), 1)
    d.text((110, 210), "No conformidad · flujo de cierre", font=font(28, True), fill=INK)
    steps = ["Detectar", "Registrar", "Acción", "Verificar"]
    for i, s in enumerate(steps):
        x = 140 + i * 230
        rounded(d, (x, 320, x + 190, 420), 8, (24, 18, 12), LINE, 1)
        d.text((x + 36, 354), s, font=font(20, True), fill=HOT)
        if i < 3:
            d.line((x + 198, 370, x + 222, 370), fill=LINE, width=2)

    # webcam column
    rounded(d, (1144, 172, 1520, 760), 10, (12, 12, 12), (50, 44, 38), 1)
    names = ["Instructor", "Ana · Calidad", "Luis · Planta", "Mora · SST"]
    for i, name in enumerate(names):
        y = 190 + i * 138
        rounded(d, (1164, y, 1500, y + 122), 8, (22, 22, 22))
        d.ellipse((1200, y + 34, 1260, y + 94), outline=LINE, width=2)
        d.text((1280, y + 48), name, font=font(18), fill=INK)

    rounded(d, (80, 784, 1520, 848), 8, (16, 16, 16), (40, 40, 40), 1)
    d.text((110, 804), "Silenciar    Cámara    Compartir    Chat    Salir", font=font(18), fill=MUTED)
    d.text((1180, 804), "Ingreso registrado", font=font(16, True), fill=HOT)
    img.save(OUT / "campus-session.png", quality=92)


if __name__ == "__main__":
    draw_lobby()
    draw_session()
    print("ok", OUT)
