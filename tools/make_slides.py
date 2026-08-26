from pathlib import Path

OUT = Path(r"C:\Proyectos\DevCen\assets\projects\slides")

def svg(title, kicker, note, bars):
    rows = ""
    for i, (label, w) in enumerate(bars):
        y = 168 + i * 52
        rows += f"""
        <text x="56" y="{y}" fill="#cfc8bc" font-size="13" font-family="Segoe UI, sans-serif">{label}</text>
        <rect x="56" y="{y + 8}" width="688" height="10" rx="1" fill="#1a1612"/>
        <rect x="56" y="{y + 8}" width="{w}" height="10" rx="1" fill="#ff6a00"/>
        """
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480">
  <rect width="800" height="480" fill="#0b0b0b"/>
  <rect x="24" y="24" width="752" height="432" fill="#101010" stroke="#ff6a00" stroke-opacity=".35"/>
  <rect x="24" y="24" width="752" height="48" fill="#14110e"/>
  <circle cx="48" cy="48" r="5" fill="#ff6a00"/>
  <text x="68" y="54" fill="#ff8a1f" font-size="12" font-family="Consolas, monospace" letter-spacing="2">DEVCEN // {kicker}</text>
  <text x="56" y="116" fill="#f4efe6" font-size="28" font-family="Segoe UI, sans-serif">{title}</text>
  <text x="56" y="144" fill="#9a958c" font-size="14" font-family="Segoe UI, sans-serif">{note}</text>
  {rows}
  <text x="56" y="430" fill="#ff8a1f" font-size="11" font-family="Consolas, monospace">SISTEMA OPERABLE</text>
</svg>"""

slides = {
    "app-1": ("Tablero de operación", "APP", "Alertas, roles y estado en un solo panel.", [("Órdenes en curso", 520), ("Alertas críticas", 210), ("Equipos en campo", 430)]),
    "app-2": ("Flujo de usuario", "APP", "De la tarea al cierre, con permisos.", [("Captura en campo", 480), ("Validación", 360), ("Cierre y evidencia", 610)]),
    "app-3": ("Indicadores", "APP", "Lo que la dirección ve al instante.", [("Cumplimiento diario", 640), ("Desvíos", 250), ("Tiempo de respuesta", 400)]),
    "campus-1": ("Catálogo de cursos", "LMS", "Formación ordenada por rol.", [("Cursos activos", 560), ("En progreso", 380), ("Completados", 470)]),
    "campus-2": ("Evaluación", "LMS", "Quién aprendió y qué falta.", [("Aprobados", 500), ("Pendientes", 280), ("Reintentos", 180)]),
    "campus-3": ("Evidencia de avance", "LMS", "Reportes listos para auditoría interna.", [("Horas de formación", 620), ("Cobertura de equipo", 440), ("Certificados", 300)]),
    "auto-1": ("Mapa de integraciones", "FLOW", "Los sistemas actuales se hablan.", [("ERP", 540), ("Planillas / mail", 260), ("Alertas operativas", 410)]),
    "auto-2": ("Cola de procesos", "FLOW", "Menos clics, menos error manual.", [("Jobs ok", 640), ("En espera", 220), ("Reproceso", 140)]),
    "auto-3": ("Control de excepciones", "FLOW", "Cuando algo falla, queda rastro.", [("Excepciones abiertas", 200), ("Resueltas", 580), ("SLA", 450)]),
    "iso-1": ("Tablero SGI", "SGI", "9001, 14001 y 45001 en un grafo.", [("No conformidades", 240), ("Acciones", 480), ("Indicadores", 560)]),
    "iso-2": ("Riesgos y evidencias", "SGI", "El registro deja de ser carpeta.", [("Riesgos activos", 320), ("Controles", 540), ("Auditorías", 400)]),
    "iso-3": ("Ciclo de mejora", "SGI", "Hallazgo → acción → cierre.", [("Abiertos", 180), ("En curso", 360), ("Cerrados", 620)]),
    "web-1": ("Arquitectura de contenidos", "WEB", "Una presencia que explica y convierte.", [("Oferta", 500), ("Prueba / casos", 360), ("Contacto", 640)]),
    "web-2": ("Recorrido del visitante", "WEB", "Del problema al presupuesto.", [("Inicio", 420), ("Servicios", 500), ("Enlace", 610)]),
    "web-3": ("Imagen de sistema", "WEB", "Marca, ritmo y llamado a la acción.", [("Claridad", 580), ("Confianza", 470), ("Conversión", 390)]),
    "plat-1": ("Mapa de módulos", "CORE", "Intranet o portal con permisos.", [("Usuarios / roles", 520), ("Módulos", 600), ("Reportes", 430)]),
    "plat-2": ("Permisos", "CORE", "Cada área ve lo que le corresponde.", [("Dirección", 480), ("Operación", 560), ("Auditoría", 300)]),
    "plat-3": ("Tablero interno", "CORE", "Datos y trámites en un solo lugar.", [("Solicitudes", 410), ("Aprobaciones", 540), ("Archivo", 360)]),
}

for name, args in slides.items():
    (OUT / f"{name}.svg").write_text(svg(*args), encoding="utf-8")

print(len(slides), "slides")
