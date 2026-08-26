const header = document.getElementById("header");
const nav = document.getElementById("site-nav");
const toggle = document.getElementById("nav-toggle");
const year = document.getElementById("year");
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
const dialog = document.getElementById("project-dialog");
const canvas = document.getElementById("spark-canvas");

year.textContent = new Date().getFullYear();

function syncScrollProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  doc.style.setProperty("--scroll", String(max > 0 ? window.scrollY / max : 0));
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

syncScrollProgress();
window.addEventListener("scroll", syncScrollProgress, { passive: true });
window.addEventListener("resize", syncScrollProgress);

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const projects = {
  app: {
    title: "App de operación y control",
    kicker: "Aplicación",
    text: "De planillas a un sistema diario: flujos, roles, indicadores y alertas en campo o planta.",
    slides: [
      { src: "assets/projects/app.jpg", caption: "El equipo opera sobre el mismo tablero." },
      { src: "assets/projects/slides/app-field.png", caption: "En campo o planta: carga y consulta desde un dispositivo." },
      { src: "assets/projects/slides/app-alerts.png", caption: "Sala de control: las alertas se ven, no se pierden en un mail." },
      { src: "assets/projects/slides/app-kpis.png", caption: "Dirección mira indicadores sin pedir un Excel." },
    ],
  },
  campus: {
    title: "Campus virtual corporativo",
    kicker: "Formación",
    text: "Quién avanzó, qué evaluó y qué evidencia queda para el equipo o la institución.",
    slides: [
      { src: "assets/projects/campus.jpg", caption: "El campus como espacio de formación medible." },
      { src: "assets/projects/slides/campus-rooms.png", caption: "Ingreso a salas virtuales: Seguridad, Calidad y Medio Ambiente. No hay aula presencial." },
      { src: "assets/projects/slides/campus-session.png", caption: "Adentro de la sala: clase en vivo, pantalla compartida e ingreso registrado." },
      { src: "assets/projects/slides/campus-exam.png", caption: "Evaluación: se ve quién aprobó y a quién hay que reforzar." },
      { src: "assets/projects/slides/campus-cert.png", caption: "Certificado: evidencia de que la formación ocurrió." },
    ],
  },
  auto: {
    title: "Automatización de procesos",
    kicker: "Operaciones",
    text: "Los sistemas actuales se hablan: menos carga manual y más control del flujo real.",
    slides: [
      { src: "assets/projects/automatizacion.jpg", caption: "El tablero donde se ve el flujo, no la planilla." },
      { src: "assets/projects/slides/auto-plant.png", caption: "Planta: las máquinas y el sistema se hablan." },
      { src: "assets/projects/slides/auto-servers.png", caption: "Integraciones: los datos viajan entre sistemas existentes." },
      { src: "assets/projects/slides/auto-desk.png", caption: "Menos carga manual: se deja de copiar de un lado a otro." },
    ],
  },
  iso: {
    title: "Gestión integrada ISO",
    kicker: "SGI",
    text: "9001, 14001 y 45001 como operación: no conformidades, riesgos y auditoría.",
    slides: [
      { src: "assets/projects/iso.jpg", caption: "El SGI deja de ser carpeta y pasa a ser sistema." },
      { src: "assets/projects/slides/iso-audit.png", caption: "Auditoría: la evidencia está a mano, no en un archivo muerto." },
      { src: "assets/projects/slides/iso-risks.png", caption: "Riesgos y controles se discuten sobre el sistema, no en un pizarrón suelto." },
      { src: "assets/projects/slides/iso-close.png", caption: "Cierre de acciones: el hallazgo tiene fecha y responsable." },
    ],
  },
  web: {
    title: "Sitio institucional",
    kicker: "Web",
    text: "Presencia que explica el valor, ordena la oferta y abre la conversación comercial.",
    slides: [
      { src: "assets/projects/web.jpg", caption: "Una web que se lee como sistema, no como vitrina." },
      { src: "assets/projects/slides/web-monitor.png", caption: "La oferta queda clara en pantalla, con una arquitectura pensada." },
      { src: "assets/projects/slides/web-visitor.png", caption: "El visitante entiende qué se hace y cómo pedir presupuesto." },
      { src: "assets/projects/slides/web-meeting.png", caption: "La web abre la conversación comercial, no la corta." },
    ],
  },
  plataforma: {
    title: "Portal corporativo a medida",
    kicker: "Plataforma",
    text: "Intranet o portal interno: módulos, permisos y reportes alineados a la organización.",
    slides: [
      { src: "assets/projects/plataforma.jpg", caption: "Un núcleo interno con módulos a medida." },
      { src: "assets/projects/slides/plat-office.png", caption: "La oficina trabaja sobre un portal, no sobre carpetas sueltas." },
      { src: "assets/projects/slides/plat-access.png", caption: "Accesos y roles: cada persona entra a lo suyo." },
      { src: "assets/projects/slides/plat-tickets.png", caption: "Solicitudes internas: se piden, se aprueban y quedan registradas." },
    ],
  },
};

let slideIndex = 0;
let slideList = [];

function renderSlide() {
  const item = slideList[slideIndex];
  if (!item) return;
  const image = document.getElementById("dialog-image");
  image.src = item.src;
  image.alt = item.caption;
  document.getElementById("slide-caption").textContent = item.caption;
  document.querySelectorAll("#slide-dots button").forEach((dot, i) => {
    dot.classList.toggle("is-on", i === slideIndex);
  });
}

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const data = projects[button.dataset.project];
    if (!data) return;
    slideList = data.slides;
    slideIndex = 0;
    document.getElementById("dialog-kicker").textContent = data.kicker;
    document.getElementById("dialog-title").textContent = data.title;
    document.getElementById("dialog-text").textContent = data.text;
    const dots = document.getElementById("slide-dots");
    dots.innerHTML = slideList
      .map((_, i) => `<button type="button" data-slide="${i}" aria-label="Foto ${i + 1}"></button>`)
      .join("");
    dots.querySelectorAll("button").forEach((dot) => {
      dot.addEventListener("click", () => {
        slideIndex = Number(dot.dataset.slide);
        renderSlide();
      });
    });
    renderSlide();
    const y = window.scrollY;
    dialog.showModal();
    window.scrollTo(0, y);
  });
});

document.getElementById("slide-prev").addEventListener("click", () => {
  if (!slideList.length) return;
  slideIndex = (slideIndex - 1 + slideList.length) % slideList.length;
  renderSlide();
});

document.getElementById("slide-next").addEventListener("click", () => {
  if (!slideList.length) return;
  slideIndex = (slideIndex + 1) % slideList.length;
  renderSlide();
});

document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nombre = String(data.get("nombre") || "").trim();
  const email = String(data.get("email") || "").trim();
  const mensaje = String(data.get("mensaje") || "").trim();

  if (!nombre || !email || !mensaje) {
    note.hidden = false;
    note.textContent = "Completá nombre, email y mensaje.";
    return;
  }

  const cuerpo = [
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `Organización: ${data.get("organizacion") || "-"}`,
    `Teléfono: ${data.get("telefono") || "-"}`,
    `Servicio: ${data.get("servicio") || "-"}`,
    "",
    mensaje,
  ].join("\n");

  window.location.href = `mailto:presupuesto@dev-cen.com?subject=${encodeURIComponent(
    "Solicitud de presupuesto DevCen"
  )}&body=${encodeURIComponent(cuerpo)}`;

  note.hidden = false;
  note.textContent =
    "Se abrió el correo hacia presupuesto@dev-cen.com. Si no se abre, escribí a ese mail o por WhatsApp al +54 9 291 402-1589.";
  form.reset();
});

function initSparks() {
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  const sparks = [];
  let raf = 0;
  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function spawn() {
    sparks.length = 0;
    const count = Math.max(140, Math.floor((width * height) / 9000));
    for (let i = 0; i < count; i += 1) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() > 0.78 ? 3.2 : Math.random() * 1.8 + 0.8,
        glow: Math.random() > 0.32,
        life: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.02,
        streak: Math.random() > 0.82,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    sparks.forEach((spark) => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.life += spark.speed;
      if (spark.x < 0) spark.x = width;
      if (spark.x > width) spark.x = 0;
      if (spark.y < 0) spark.y = height;
      if (spark.y > height) spark.y = 0;
      const pulse = 0.45 + Math.abs(Math.sin(spark.life)) * 0.55;
      if (spark.streak) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 138, 31, ${0.35 + pulse * 0.45})`;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = "#ff6a00";
        ctx.shadowBlur = 14;
        ctx.moveTo(spark.x, spark.y);
        ctx.lineTo(spark.x - spark.vx * 18, spark.y - spark.vy * 18);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.beginPath();
      ctx.fillStyle = spark.glow
        ? `rgba(255, 138, 31, ${0.55 + pulse * 0.45})`
        : `rgba(244, 241, 234, ${0.28 + pulse * 0.4})`;
      ctx.shadowColor = spark.glow ? "#ff6a00" : "rgba(255, 255, 255, 0.4)";
      ctx.shadowBlur = spark.glow ? 18 * pulse : 8;
      ctx.arc(spark.x, spark.y, spark.r * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    for (let i = 0; i < sparks.length; i += 1) {
      for (let j = i + 1; j < sparks.length; j += 1) {
        const a = sparks[i];
        const b = sparks[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && (a.glow || b.glow)) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 106, 0, ${0.18 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  resize();
  spawn();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    spawn();
    draw();
  });
}

const railLinks = document.querySelectorAll(".section-rail a");
const observed = document.querySelectorAll("main section[id]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && observed.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        railLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.rail === entry.target.id);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  observed.forEach((section) => observer.observe(section));
}

if ("IntersectionObserver" in window && !reduceMotion) {
  const live = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-live", entry.isIntersecting);
      });
    },
    { threshold: 0.18, rootMargin: "-10% 0px -22% 0px" }
  );
  observed.forEach((section) => live.observe(section));
} else {
  observed.forEach((section) => section.classList.add("is-live"));
}

document.querySelectorAll(".circuit-break").forEach((el) => {
  el.innerHTML = `
    <svg viewBox="0 0 1000 48" preserveAspectRatio="none">
      <path class="trace" d="M0 24 H430 L452 10 H488 L510 24 H1000" />
      <path class="pulse" d="M0 24 H430 L452 10 H488 L510 24 H1000" />
      <circle class="core" cx="500" cy="24" r="3.6" />
      <circle cx="430" cy="24" r="2" fill="#c8ccd4" />
      <circle cx="570" cy="24" r="2" fill="#c8ccd4" />
    </svg>
  `;
});

document.querySelectorAll(".split-head, .work-intro, .who-strip, .iso-layout, .proto-player, .work-tile, .orbit-stage, .contact-layout > *").forEach((el) => {
  el.classList.add("reveal");
});

const revealItems = document.querySelectorAll(".reveal, .iso-graph");
if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        reveal.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  revealItems.forEach((el) => reveal.observe(el));
}

const consoleLine = document.querySelector(".console-line");
if (consoleLine) {
  const full = consoleLine.dataset.type || "";
  if (reduceMotion) {
    consoleLine.textContent = full;
  } else {
    consoleLine.classList.add("is-typing");
    let i = 0;
    const tick = () => {
      consoleLine.textContent = full.slice(0, i);
      i += 1;
      if (i <= full.length) {
        window.setTimeout(tick, 28);
      } else {
        consoleLine.classList.remove("is-typing");
      }
    };
    window.setTimeout(tick, 280);
  }
}

initSparks();

const protocol = [
  {
    title: "Diagnóstico",
    plain: "Primero escuchamos. Contás cómo trabajan hoy, con qué herramientas y dónde se traba el proceso. Sin este mapa no se promete un sistema.",
    in: "Contexto, herramientas y norma si aplica",
    out: "Mapa de la necesidad, en claro",
    time: "1 reunión + relevamiento breve",
    close: "Alcance escrito, todavía sin compromiso de obra",
  },
  {
    title: "Diseño",
    plain: "Acá se decide qué se construye y qué no. Ves el plano: módulos, quién entra, qué evidencia deja el sistema.",
    in: "El alcance que acabamos de acordar",
    out: "Esquema de módulos, permisos y datos",
    time: "Una iteración corta de diseño",
    close: "Vos validás el plano antes de programar",
  },
  {
    title: "Desarrollo",
    plain: "No desaparecemos tres meses. Vas viendo versiones, probás y pedís ajustes. El sistema se forma en ciclos cortos.",
    in: "Plano validado y prioridades",
    out: "Versiones que se pueden usar en prueba",
    time: "Demos frecuentes",
    close: "Aceptación de lo crítico, no de un paquete ciego",
  },
  {
    title: "Implantación",
    plain: "El sistema entra en operación. Capacitación, accesos y documentación: queda en manos de quienes lo van a usar.",
    in: "Versión aceptada y usuarios clave",
    out: "Producción + personas que saben operarlo",
    time: "Arranque controlado",
    close: "Entrega de accesos y papeles del sistema",
  },
  {
    title: "Mejora",
    plain: "No termina en el encendido. Se mira el uso real, se corrige y se suma lo que el trabajo pide después.",
    in: "Uso real e indicadores",
    out: "Ajustes, soporte y nuevas piezas",
    time: "Según la operación",
    close: "Criterios de mejora acordados",
  },
];

function initProtocol() {
  const rail = document.getElementById("proto-rail");
  const fill = document.getElementById("proto-fill");
  const title = document.getElementById("proto-title");
  const plain = document.getElementById("proto-plain");
  const facts = document.getElementById("proto-facts");
  const kicker = document.getElementById("proto-kicker");
  if (!rail || !title) return;
  let step = 0;
  let timer = 0;
  let hold = 0;

  rail.innerHTML = protocol
    .map((item, i) => `<li><button type="button" data-step="${i}"><span>0${i + 1}</span><b>${item.title}</b></button></li>`)
    .join("");

  function show(index, resetHold = true) {
    step = index;
    const item = protocol[step];
    kicker.textContent = `ETAPA 0${step + 1} / 05  ·  qué pasa ahora`;
    title.textContent = item.title;
    plain.textContent = item.plain;
    facts.innerHTML = `
      <div><dt>Entra</dt><dd>${item.in}</dd></div>
      <div><dt>Sale</dt><dd>${item.out}</dd></div>
      <div><dt>Tiempo</dt><dd>${item.time}</dd></div>
      <div><dt>Cierre</dt><dd>${item.close}</dd></div>
    `;
    rail.querySelectorAll("button").forEach((btn, i) => {
      btn.classList.toggle("is-on", i === step);
    });
    if (resetHold) hold = 0;
    fill.style.width = `${(hold / 420) * 100}%`;
  }

  function tick() {
    hold += 1;
    fill.style.width = `${Math.min(100, (hold / 420) * 100)}%`;
    if (hold >= 420) {
      hold = 0;
      show((step + 1) % protocol.length, false);
    }
    timer = requestAnimationFrame(tick);
  }

  rail.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => show(Number(btn.dataset.step)));
  });
  document.getElementById("proto-prev").addEventListener("click", () => {
    show((step - 1 + protocol.length) % protocol.length);
  });
  document.getElementById("proto-next").addEventListener("click", () => {
    show((step + 1) % protocol.length);
  });

  show(0);
  if (!reduceMotion) {
    const play = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cancelAnimationFrame(timer);
          timer = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }, { threshold: 0.35 });
    play.observe(document.getElementById("proto-player"));
  }
}

initProtocol();

if (!reduceMotion) {
  document.querySelectorAll(".work-tile, .contact-form, .sat").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

const tickerEl = document.getElementById("nav-ticker");
const tickerPhrases = [
  "La empresa que mide, decide mejor.",
  "Un sistema nuevo ahorra lo que hoy se pierde a mano.",
  "Tecnología que el equipo usa, no que queda en un cajón.",
];

function typeCycle(el, phrases, speed = 24, hold = 2800) {
  if (!el) return;
  let p = 0;
  let i = 0;
  const tick = () => {
    const full = phrases[p];
    i += 1;
    el.textContent = full.slice(0, i);
    el.parentElement?.classList.add("is-typing");
    if (i >= full.length) {
      el.parentElement?.classList.remove("is-typing");
      window.setTimeout(() => {
        p = (p + 1) % phrases.length;
        i = 0;
        tick();
      }, hold);
      return;
    }
    window.setTimeout(tick, speed);
  };
  if (reduceMotion) {
    el.textContent = phrases[0];
    return;
  }
  tick();
}

typeCycle(tickerEl, tickerPhrases);

const stickyCopy = document.getElementById("sticky-copy");
const stickyPhrases = [
  "Pagás según el alcance que cerramos, no un paquete cerrado.",
  "Pedí un demo gratis: simulamos el sistema antes de construirlo.",
  "Empezamos por lo que entra en tu presupuesto. El resto, después.",
];
let stickyI = 0;
if (stickyCopy && !reduceMotion) {
  window.setInterval(() => {
    stickyI = (stickyI + 1) % stickyPhrases.length;
    stickyCopy.textContent = stickyPhrases[stickyI];
  }, 5200);
}

document.getElementById("sticky-close")?.addEventListener("click", () => {
  document.body.classList.add("banner-off");
});
