---
name: devcen-deploy
description: >-
  Deploy and configure the DevCen static site on Cloudflare Workers with
  wrangler.jsonc. Use when deploying, debugging production, DNS, custom domains,
  wrangler config, or Cloudflare assets for dev-cen.com.
---

# DevCen — Deploy en Cloudflare

Sitio estático servido por **Cloudflare Workers** con **Workers Assets** (sin Worker script custom).

## Configuración actual

Archivo: `wrangler.jsonc`

- **Worker name:** `devcen-web`
- **Assets:** directorio raíz `"."` (`html_handling: auto-trailing-slash`)
- **Dominios:** `www.dev-cen.com`, `dev-cen.com` (custom_domain en routes)
- **Excluidos** (`.assetsignore`): `.git`, `.wrangler`, `node_modules`, `tools`, `*.py`, `.env*`

## Comandos

```bash
# Verificar auth
wrangler whoami

# Desarrollo local (si wrangler instalado)
wrangler dev

# Publicar
wrangler deploy

# Logs en vivo
wrangler tail
```

Si `wrangler` no está instalado:

```bash
npm install -D wrangler@latest
```

## Flujo recomendado

1. Probar en local: `python -m http.server 5173` + Ctrl+F5.
2. Commit y push a `main` si el repo está conectado a Cloudflare (auto-deploy) **o** `wrangler deploy` manual.
3. Verificar `https://www.dev-cen.com` con recarga forzada.

## Errores conocidos

- **No usar `_redirects`** con URLs absolutas en este proyecto (falló deploy error 100324).
- Paths en Linux (Cloudflare) son **case-sensitive**; respetar mayúsculas en `assets/`.
- Tras cambiar CSS de tema claro, subir `?v=N` en `js/theme.js` (`LIGHT_CSS`).
- Tras cambiar `styles.css`, subir `?v=N` en el `<link>` de `index.html`.

## DNS / dominio

- Apex y `www` apuntan al Worker en Cloudflare.
- Certificado Universal SSL en Cloudflare; si queda “Despliegue pendiente”, revisar en el dashboard.

## Qué no va al deploy

- `preview.html`, `preview-light.html`, `css/preview*.css`, `js/preview*.js` — se publican si están en el repo (no están en `.assetsignore`). Si deben quedar solo locales, añadirlos a `.assetsignore` antes de deploy.
- `.cursor/` no afecta el sitio; es configuración del IDE.

## Referencia Wrangler

Para flags y opciones nuevas, usar skill global `wrangler` y docs oficiales de Cloudflare Workers Assets.
