// Portfolio: datos, filtros, comparación antes/después y lightbox accesible.
// Las URLs placehold.co son marcadores internos y nunca se muestran como trabajos reales.
const trabajosData = [
  {
    id: 1,
    nombre: "Balayage + matiz",
    descripcion: "Suave transición de color natural con reflejos miel",
    categoria: "coloracion",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Balayage+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Balayage+1" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Balayage+2", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Balayage+2" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Balayage+3", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Balayage+3" }
    ]
  },
  {
    id: 2,
    nombre: "Corte bob texturizado",
    descripcion: "Moderno, fresco y fácil de peinar",
    categoria: "cortes",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Corte+bob+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Corte+bob+1" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Corte+bob+2", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Corte+bob+2" }
    ]
  },
  {
    id: 3,
    nombre: "Mechas californianas",
    descripcion: "Efecto solar degradado muy natural",
    categoria: "coloracion",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Mechas+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Mechas+1" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Mechas+2", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Mechas+2" }
    ]
  },
  {
    id: 4,
    nombre: "Recogido novia",
    descripcion: "Elegante y romántico para ocasiones especiales",
    categoria: "peinados",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Recogido+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Recogido+1" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Recogido+2", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Recogido+2" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Recogido+3", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Recogido+3" }
    ]
  },
  {
    id: 5,
    nombre: "Tratamiento botox capilar",
    descripcion: "Recuperación y brillo intenso para el cabello",
    categoria: "tratamientos",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Botox+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Botox+1" }
    ]
  },
  {
    id: 6,
    nombre: "Corte degradado hombre",
    descripcion: "Estilo moderno y desenfadado",
    categoria: "cortes",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Corte+hombre+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Corte+hombre+1" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Corte+hombre+2", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Corte+hombre+2" }
    ]
  },
  {
    id: 7,
    nombre: "Peinado ondas playeras",
    descripcion: "Ondas suaves y naturales con mucho movimiento",
    categoria: "peinados",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Ondas+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Ondas+1" }
    ]
  },
  {
    id: 8,
    nombre: "Coloración fantasía",
    descripcion: "Rosas pastel para un look atrevido",
    categoria: "coloracion",
    imagenes: [
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Fantasía+1", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Fantasía+1" },
      { antes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Fantasía+2", despues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Fantasía+2" }
    ]
  }
];

const categoriasNombres = {
  cortes: "Cortes",
  coloracion: "Coloración",
  peinados: "Peinados",
  tratamientos: "Tratamientos"
};

const estadosTrabajos = new Map();
let filtroActivo = "todos";
let lightboxActivo = false;
let lightboxTrabajoId = null;
let lightboxIndice = 0;
let lightboxVista = "despues";
let ultimoFoco = null;

function obtenerEstado(trabajoId) {
  if (!estadosTrabajos.has(trabajoId)) {
    estadosTrabajos.set(trabajoId, { indice: 0, vista: "despues" });
  }
  return estadosTrabajos.get(trabajoId);
}

function esPlaceholder(source) {
  const src = typeof source === "string" ? source : source?.src;
  return !src || src.includes("placehold.co");
}

function normalizarFuente(source) {
  if (typeof source === "string") return { src: source };
  return source || {};
}

function renderizarMedia(source, trabajo, vista, loading = "lazy") {
  const etiquetaVista = vista === "antes" ? "Antes" : "Después";

  if (esPlaceholder(source)) {
    return `
      <div class="portfolio-placeholder" role="img" aria-label="Fotografía pendiente: ${etiquetaVista} de ${trabajo.nombre}">
        <span class="placeholder-state">${etiquetaVista} · Contenido provisional</span>
        <span class="placeholder-note">Fotografía real pendiente</span>
      </div>
    `;
  }

  const media = normalizarFuente(source);
  const avif = media.avif ? `<source type="image/avif" srcset="${media.avif}">` : "";
  const webp = media.webp ? `<source type="image/webp" srcset="${media.webp}">` : "";
  const srcset = media.srcset ? ` srcset="${media.srcset}"` : "";
  const sizes = media.sizes ? ` sizes="${media.sizes}"` : ' sizes="(max-width: 820px) 92vw, 55vw"';

  return `
    <picture>
      ${avif}${webp}
      <img
        src="${media.src}"
        ${srcset}${sizes}
        alt="${etiquetaVista} — ${trabajo.nombre}"
        width="1200"
        height="1500"
        loading="${loading}"
        decoding="async"
      >
    </picture>
  `;
}

function renderizarControlesSerie(trabajo, estado) {
  if (trabajo.imagenes.length <= 1) return "";
  return `
    <div class="series-controls" aria-label="Serie de fotografías">
      <button class="series-arrow pair-nav" type="button" data-direction="prev" data-id="${trabajo.id}" aria-label="Fotografía anterior de ${trabajo.nombre}">←</button>
      <span>Serie ${estado.indice + 1} de ${trabajo.imagenes.length}</span>
      <button class="series-arrow pair-nav" type="button" data-direction="next" data-id="${trabajo.id}" aria-label="Fotografía siguiente de ${trabajo.nombre}">→</button>
    </div>
  `;
}

function renderizarCaso(trabajo, posicion) {
  const estado = obtenerEstado(trabajo.id);
  const source = trabajo.imagenes[estado.indice][estado.vista];
  const carga = posicion < 2 ? "eager" : "lazy";

  return `
    <article class="trabajo-case" data-id="${trabajo.id}" data-categoria="${trabajo.categoria}">
      <div class="case-media-shell">
        <button class="case-open" type="button" data-id="${trabajo.id}" aria-label="Ampliar ${trabajo.nombre}, vista ${estado.vista === "antes" ? "antes" : "después"}">
          <div class="case-media" id="case-media-${trabajo.id}">
            ${renderizarMedia(source, trabajo, estado.vista, carga)}
          </div>
        </button>
        <div class="comparison-controls" role="group" aria-label="Comparar ${trabajo.nombre}">
          <button class="comparison-btn" type="button" data-id="${trabajo.id}" data-view="antes" aria-pressed="${estado.vista === "antes"}">Antes</button>
          <button class="comparison-btn" type="button" data-id="${trabajo.id}" data-view="despues" aria-pressed="${estado.vista === "despues"}">Después</button>
        </div>
      </div>
      <div class="trabajo-info">
        <div class="trabajo-meta">
          <span>${categoriasNombres[trabajo.categoria]}</span>
          <span>0${String(trabajo.id)}</span>
        </div>
        <h3 class="trabajo-nombre">${trabajo.nombre}</h3>
        <p class="trabajo-descripcion">${trabajo.descripcion}</p>
        ${renderizarControlesSerie(trabajo, estado)}
      </div>
    </article>
  `;
}

function trabajosFiltrados() {
  if (filtroActivo === "todos") return trabajosData;
  return trabajosData.filter((trabajo) => trabajo.categoria === filtroActivo);
}

function renderizarTrabajos() {
  const container = document.getElementById("trabajosGrid");
  const status = document.getElementById("portfolioStatus");
  if (!container) return;

  const trabajos = trabajosFiltrados();
  if (status) status.textContent = `${trabajos.length} ${trabajos.length === 1 ? "trabajo" : "trabajos"}`;

  if (trabajos.length === 0) {
    container.innerHTML = '<p class="no-trabajos">No hay trabajos disponibles para esta categoría.</p>';
    return;
  }

  container.innerHTML = trabajos.map(renderizarCaso).join("");
}

function actualizarCaso(trabajoId) {
  const trabajo = trabajosData.find((item) => item.id === trabajoId);
  const caseElement = document.querySelector(`.trabajo-case[data-id="${trabajoId}"]`);
  if (!trabajo || !caseElement) return;

  const estado = obtenerEstado(trabajoId);
  const source = trabajo.imagenes[estado.indice][estado.vista];
  const media = caseElement.querySelector(`#case-media-${trabajoId}`);
  if (media) media.innerHTML = renderizarMedia(source, trabajo, estado.vista);

  caseElement.querySelectorAll(".comparison-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.view === estado.vista));
  });

  const openButton = caseElement.querySelector(".case-open");
  openButton?.setAttribute("aria-label", `Ampliar ${trabajo.nombre}, vista ${estado.vista === "antes" ? "antes" : "después"}`);

  const seriesLabel = caseElement.querySelector(".series-controls span");
  if (seriesLabel) seriesLabel.textContent = `Serie ${estado.indice + 1} de ${trabajo.imagenes.length}`;
}

function cambiarSerie(trabajoId, direction) {
  const trabajo = trabajosData.find((item) => item.id === trabajoId);
  if (!trabajo || trabajo.imagenes.length <= 1) return;
  const estado = obtenerEstado(trabajoId);
  const step = direction === "prev" ? -1 : 1;
  estado.indice = (estado.indice + step + trabajo.imagenes.length) % trabajo.imagenes.length;
  actualizarCaso(trabajoId);
}

function initFiltros() {
  document.querySelectorAll(".filtro-btn").forEach((button) => {
    button.addEventListener("click", () => {
      filtroActivo = button.dataset.filtro;
      document.querySelectorAll(".filtro-btn").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderizarTrabajos();
    });
  });
}

function actualizarLightbox() {
  const trabajo = trabajosData.find((item) => item.id === lightboxTrabajoId);
  if (!trabajo) return;

  const source = trabajo.imagenes[lightboxIndice][lightboxVista];
  document.getElementById("lightboxTitle").textContent = trabajo.nombre;
  document.getElementById("lightboxCategory").textContent = `${categoriasNombres[trabajo.categoria]} · ${lightboxVista === "antes" ? "Antes" : "Después"}`;
  document.getElementById("lightboxMedia").innerHTML = renderizarMedia(source, trabajo, lightboxVista, "eager");
  document.getElementById("lightboxCounter").textContent = `Serie ${lightboxIndice + 1} de ${trabajo.imagenes.length}`;

  document.querySelectorAll("[data-lightbox-view]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lightboxView === lightboxVista));
  });

  const hideSeries = trabajo.imagenes.length <= 1;
  document.getElementById("lightboxPrev").hidden = hideSeries;
  document.getElementById("lightboxNext").hidden = hideSeries;
}

function openLightbox(trabajoId) {
  const trabajo = trabajosData.find((item) => item.id === trabajoId);
  if (!trabajo) return;

  const estado = obtenerEstado(trabajoId);
  const lightbox = document.getElementById("lightbox");
  ultimoFoco = document.activeElement;
  lightboxTrabajoId = trabajoId;
  lightboxIndice = estado.indice;
  lightboxVista = estado.vista;
  lightboxActivo = true;

  actualizarLightbox();
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("lightboxClose").focus();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightboxActivo || !lightbox) return;
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxActivo = false;
  ultimoFoco?.focus();
}

function navegarLightbox(direction) {
  const trabajo = trabajosData.find((item) => item.id === lightboxTrabajoId);
  if (!trabajo || trabajo.imagenes.length <= 1) return;
  const step = direction === "prev" ? -1 : 1;
  lightboxIndice = (lightboxIndice + step + trabajo.imagenes.length) % trabajo.imagenes.length;
  actualizarLightbox();
}

function abrirWhatsApp(mensaje) {
  const telefono = "34916623438";
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
}

function consultarTrabajoActual() {
  const trabajo = trabajosData.find((item) => item.id === lightboxTrabajoId);
  if (!trabajo) return;
  abrirWhatsApp(`Hola, he visto la referencia de "${trabajo.nombre}". ¿Podéis orientarme para conseguir algo similar?`);
}

function initPortfolioInteractions() {
  const grid = document.getElementById("trabajosGrid");
  let touchStartX = 0;
  let touchedCaseId = null;

  grid?.addEventListener("click", (event) => {
    const comparison = event.target.closest(".comparison-btn");
    if (comparison) {
      const trabajoId = Number(comparison.dataset.id);
      obtenerEstado(trabajoId).vista = comparison.dataset.view;
      actualizarCaso(trabajoId);
      return;
    }

    const pairNav = event.target.closest(".pair-nav");
    if (pairNav) {
      cambiarSerie(Number(pairNav.dataset.id), pairNav.dataset.direction);
      return;
    }

    const openButton = event.target.closest(".case-open");
    if (openButton) openLightbox(Number(openButton.dataset.id));
  });

  grid?.addEventListener("touchstart", (event) => {
    const mediaShell = event.target.closest(".case-media-shell");
    if (!mediaShell) return;
    touchStartX = event.changedTouches[0].screenX;
    touchedCaseId = Number(mediaShell.closest(".trabajo-case").dataset.id);
  }, { passive: true });

  grid?.addEventListener("touchend", (event) => {
    if (!touchedCaseId) return;
    const diff = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 55) cambiarSerie(touchedCaseId, diff > 0 ? "prev" : "next");
    touchedCaseId = null;
  }, { passive: true });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev")?.addEventListener("click", () => navegarLightbox("prev"));
  document.getElementById("lightboxNext")?.addEventListener("click", () => navegarLightbox("next"));
  document.getElementById("lightboxWhatsapp")?.addEventListener("click", consultarTrabajoActual);

  document.querySelectorAll("[data-lightbox-view]").forEach((button) => {
    button.addEventListener("click", () => {
      lightboxVista = button.dataset.lightboxView;
      actualizarLightbox();
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener("touchend", (event) => {
    const diff = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 55) navegarLightbox(diff > 0 ? "prev" : "next");
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!lightboxActivo) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") navegarLightbox("prev");
    if (event.key === "ArrowRight") navegarLightbox("next");

    if (event.key === "Tab") {
      const focusables = [...lightbox.querySelectorAll('button:not([hidden]), [href], [tabindex]:not([tabindex="-1"])')]
        .filter((element) => element.getClientRects().length > 0 && !element.disabled);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarTrabajos();
  initFiltros();
  initPortfolioInteractions();
  initLightbox();

  document.getElementById("btnReservarCTA")?.addEventListener("click", () => {
    abrirWhatsApp("Hola, he visto vuestro portfolio y me gustaría reservar una cita en Go Estilistas.");
  });
  document.getElementById("btnConsultarCTA")?.addEventListener("click", () => {
    abrirWhatsApp("Hola, he visto vuestro portfolio y me gustaría consultar qué cambio podría encajar conmigo.");
  });
});
