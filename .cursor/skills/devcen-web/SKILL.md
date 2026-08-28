---
name: devcen-web
description: >-
  Develop and maintain the DevCen Connected Systems static marketing site
  (HTML/CSS/vanilla JS, dual themes, Spanish copy). Use when editing index.html,
  styles, themes, preview pages, assets, copy, mobile layout, or site behavior
  in this repository.
---

# DevCen Web

Sitio estático de marketing para **DevCen Connected Systems**. Sin framework: HTML + CSS + JS vanilla. Producción en **Cloudflare Workers** (assets estáticos).

## Stack y archivos clave

| Rol | Archivo |
|-----|---------|
| Página producción | `index.html` |
| Estilos base (tema oscuro) | `css/styles.css` |
| Estilos tema claro | `css/theme-light.css` (cargado dinámicamente) |
| Lógica UI | `js/main.js` |
| Selector de tema | `js/theme.js` |
| Preview oscuro (local) | `preview.html`, `css/preview.css`, `js/preview-main.js` |
| Preview claro (legacy) | `preview-light.html` — preferir `index.html` + selector Oscuro/Claro |

**No editar producción vía preview** sin pasar los cambios a `index.html` / `main.js` / `styles.css` cuando el usuario apruebe.

## Temas (Oscuro / Claro)

- Clase en `<html>`: `theme-dark` (default) o `theme-light`.
- `js/theme.js` carga `css/theme-light.css`, persiste en `localStorage` (`devcen-theme`).
- **Ambos temas:** `assets/mark.svg` + `.brand-text` (DEVCEN / CONNECTED SYSTEMS) con animación `mark-live`.
- Overrides de tema claro van en `css/theme-light.css`, no mezclar estilos claros en `styles.css` salvo componentes compartidos (`.theme-switch`, layout header).
- Sparks en canvas: `main.js` detecta `theme-light` en cada frame.
- Al cambiar `theme-light.css`, subir `?v=N` en `js/theme.js` (`LIGHT_CSS`).

## Header y navegación

- Grid: logo | nav-code | site-nav (centrado) | theme-switch-desktop | nav-ticker.
- Mobile (≤960px): ocultar ticker y theme desktop; `.header-actions` con theme-switch-mobile + hamburguesa.
- Ticker: frases en `main.js`; `lockTickerWidth()` fija ancho; `>` en `::before` del `.nav-ticker`.
- **Navbar** sticky; **sticky banner** NO fijo (scroll con contenido).

## Voz y contenido

Ver skill `devcen-content`. Resumen: equipo, plataformas corporativas, ISO como complemento.

## CSS

- Variables en `:root` de `styles.css` (`--bg`, `--orange`, `--header-h: 80px`, `--header-surface`, etc.).
- Tema claro redefine variables en `html.theme-light` dentro de `theme-light.css`.
- Evitar `#ffffff` plano en tema claro; usar `--card`, `--card-highlight`, `--surface` (cremas/arena).
- Hero: `.hero-axis` con `.axis-line` + `.axis-sub`; en claro la primera línea es color sólido `--heading`.
- Contacto: `.contact-facts` con `.contact-fact`, `.contact-fact-label`, `.contact-fact-value`.
- Protocolo mobile: rail 5 columnas; solo `.is-on` muestra nombre de etapa.

## HTML recurrente

- Banner: `.sticky-banner` > `.sticky-banner-inner` > `.pay-motto` + `#sticky-copy`.
- Marca: `.brand-mark` + `.brand-text` en header y footer.
- Header: `.theme-switch-desktop`, `.header-actions` (mobile).

## Vista previa local

```bash
python -m http.server 5173
```

- Producción: `http://localhost:5173/`
- Forzar recarga: **Ctrl+F5** tras cambiar assets o CSS (`styles.css?v=N` en `index.html`).

## Assets

- Logo: `assets/mark.svg`
- OG/social: `assets/logo.jpg`
- `tools/` y `*.py` están en `.assetsignore` (no se publican).

## Git

- No commitear salvo pedido explícito del usuario.
- Mensajes de commit en español, enfocados en el porqué.

## Skills complementarios del proyecto

- Deploy: `devcen-deploy`
- Copy: `devcen-content`
