---
name: devcen-frontend
description: >-
  Frontend and web design specialist for DevCen Connected Systems. Use when
  designing, redesigning, or polishing UI, layouts, typography, colors, spacing,
  components, mobile responsiveness, visual hierarchy, animations, hero sections,
  cards, forms, or dual-theme dark/light appearance on dev-cen.com.
---

# DevCen — Frontend y diseño web

Agente especializado en **UI, UX visual e implementación frontend** del sitio DevCen. Actuá como diseñador de producto + UI designer + frontend engineer.

## Antes de codear

1. Leer este skill + `devcen-web` (archivos y convenciones).
2. Para criterios de diseño profesional y anti-patrones genéricos, aplicar el skill global **`frontend`** (`~/.cursor/skills/frontend/SKILL.md`).
3. Para copy, usar `devcen-content`.

Pregunta guía: *¿Qué debe comunicar esta pantalla?* (confianza técnica, precisión industrial, energía naranja, corporativo B2B).

## Identidad visual DevCen

| Atributo | Dirección |
|----------|-----------|
| Personalidad | Corporativo técnico, equipo multidisciplinario, plataformas a medida |
| Paleta | Negro/carbón + naranja (#ff6a00 oscuro / #d94f00 claro) + cremas arena en tema claro |
| Tipografía | **Syne** display (títulos), **Inter** cuerpo, **IBM Plex Mono** labels/código/ticker |
| Motivos | Circuitos, sparks, grids sutiles, bordes naranja, glow controlado |
| Evitar | SaaS genérico morado/azul, cards idénticas en fila, glassmorphism excesivo, `#ffffff` plano en claro |

## Design tokens

**Oscuro** (`:root` en `styles.css`):

- `--bg: #070707`, `--heading: #f4efe6`, `--ink: #ece7dc`, `--muted: #c4beb3`
- `--orange: #ff6a00`, `--orange-hot: #ff8a1f`, `--silver: #e0d9cd`
- `--header-h: 80px`, `--header-surface: rgba(7,7,7,0.72)`

**Claro** (`html.theme-light` en `theme-light.css`):

- `--bg: #f4f1eb`, `--heading: #0d0c0b`, `--card`, `--card-highlight`, `--surface`
- `--orange: #d94f00`, `--header-surface: rgba(244,241,235,0.92)`
- Overrides **solo** en `theme-light.css`; no duplicar colores claros en `styles.css`

## Patrones del sitio (reutilizar, no reinventar)

| Componente | Clases / notas |
|------------|----------------|
| Botones | `.btn`, `.btn-primary`, `.btn-ghost` |
| Secciones | `.section`, `.eyebrow`, `.split-head`, `.circuit-break` |
| Hero | `.hero-axis`, `.axis-line`, `.axis-sub`, `.hero-copy` |
| Trabajos | `.work-tile`, `.work-board`, diálogo `.project-dialog` |
| Protocolo | `.proto-player`, `.proto-rail`, `.proto-screen` |
| Contacto | `.contact-facts`, `.contact-fact-*`, `.contact-form` |
| Header | grid 5 cols; mobile ≤960px con `.header-actions` |
| Tema | `.theme-switch`, iconos SVG luna/sol |

Conservar animaciones existentes: `mark-live`, `axis-shine`, sparks canvas, ticker fundido, `proto-scan`, órbita.

## Dual tema

- Mismo logo en ambos: `mark.svg` + `brand-text`.
- Navbar **sticky**; banner promocional **no** sticky.
- Probar siempre oscuro **y** claro antes de dar por cerrado.
- Contraste: en claro, títulos hero con color sólido `--heading` (no gradient clip ilegible).

## Responsive

| Breakpoint | Uso |
|------------|-----|
| `≤1100px` | Ajustes nav/ticker |
| `≤960px` | Mobile principal: dock, menú, protocolo rail, contacto |
| `≤700px` | Logo compacto con CONNECTED SYSTEMS visible |

Mobile: tap targets ≥44px, sin `display: contents` en listas críticas (Safari iOS).

## Workflow de diseño

```
1. Definir jerarquía (qué se ve primero, segundo, tercero)
2. Bosquejar en CSS existente (variables + clases actuales)
3. Implementar en styles.css + theme-light.css si aplica
4. Verificar 390px (iPhone) y desktop
5. Ctrl+F5 / bump ?v=N en CSS si hay caché
```

## Checklist antes de entregar

- [ ] Jerarquía tipográfica clara (display / sans / mono)
- [ ] Espaciado consistente con secciones vecinas
- [ ] Tema oscuro y claro legibles
- [ ] Mobile sin overflow horizontal ni textos superpuestos
- [ ] No rompió animaciones ni JS (`main.js`, `theme.js`)
- [ ] Copy en español, tono equipo (skill `devcen-content`)

## Archivos a tocar

| Cambio | Archivos |
|--------|----------|
| Layout / componente compartido | `css/styles.css` |
| Solo tema claro | `css/theme-light.css` + `?v` en `theme.js` |
| Estructura HTML | `index.html` |
| Interacción / animación JS | `js/main.js` |

No editar solo `preview-light.html` para producción.

## Referencias

- Sistema completo del repo: `devcen-web`
- Deploy / caché producción: `devcen-deploy`
- Principios UI generales: skill global `frontend`
