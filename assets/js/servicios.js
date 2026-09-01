// Servicios: datos, filtros, carta por categorías y reserva contextual.
const serviciosData = [
  // CORTES Y PEINADOS
  { nombre: "Corte Mujer", categoria: "Cortes y Peinados", genero: "mujer", precio: 23, duracion: 40, destacado: false },
  { nombre: "Corte Uni Zona", categoria: "Cortes y Peinados", genero: "mujer", precio: 10, duracion: 30, destacado: false },
  { nombre: "Peinado con tenacilla o plancha", categoria: "Cortes y Peinados", genero: "mujer", precio: 33, duracion: 50, destacado: false },
  { nombre: "Recogido", categoria: "Cortes y Peinados", genero: "mujer", precio: 59, duracion: 90, destacado: false },
  { nombre: "Semirrecogido", categoria: "Cortes y Peinados", genero: "mujer", precio: 45, duracion: 60, destacado: false },
  { nombre: "Corte Caballero", categoria: "Cortes y Peinados", genero: "hombre", precio: 18, duracion: 30, destacado: false },
  { nombre: "Corte Niño/a", categoria: "Cortes y Peinados", genero: "infantil", precio: 14, duracion: 30, destacado: false },

  // COLORACIÓN
  { nombre: "Baño de color", categoria: "Coloración", genero: "mujer", precio: 40, duracion: 55, destacado: false },
  { nombre: "Elumen", categoria: "Coloración", genero: "mujer", precio: 25, duracion: 120, precioVariable: true, destacado: false },
  { nombre: "Decoloración raíz", categoria: "Coloración", genero: "mujer", precio: 40, duracion: 165, destacado: false },
  { nombre: "Decoloración completa", categoria: "Coloración", genero: "mujer", precio: 80, duracion: 195, destacado: false },
  { nombre: "Matiz de color", categoria: "Coloración", genero: "mujer", precio: 10, duracion: 25, precioVariable: true, destacado: false },
  { nombre: "Color raíz permanente", categoria: "Coloración", genero: "mujer", precio: 20, duracion: 70, precioVariable: true, destacado: false },
  { nombre: "Elumen fantasía", categoria: "Coloración", genero: "mujer", precio: 86.90, duracion: 190, destacado: false },
  { nombre: "Color hombre", categoria: "Coloración", genero: "hombre", precio: 20, duracion: 110, destacado: false },

  // MECHAS
  { nombre: "Retoque media cabeza de mechas", categoria: "Mechas", genero: "mujer", precio: 32, duracion: 120, destacado: false },
  { nombre: "Mechas balayage", categoria: "Mechas", genero: "mujer", precio: 100, duracion: 255, destacado: true },
  { nombre: "Retoque mechas raíz", categoria: "Mechas", genero: "mujer", precio: 64.90, duracion: 120, destacado: false },
  { nombre: "Mechas babylights + lavado", categoria: "Mechas", genero: "mujer", precio: 90, duracion: 220, precioVariable: true, destacado: false },

  // TRATAMIENTOS CAPILARES
  { nombre: "Oxigenación cuero cabelludo y cabello", categoria: "Tratamientos Capilares", genero: "unisex", precio: 12, duracion: 30, destacado: false },
  { nombre: "Tratamiento Max Curl", categoria: "Tratamientos Capilares", genero: "unisex", precio: 60, duracion: 110, precioVariable: true, destacado: false },
  { nombre: "Tratamiento Max Botox", categoria: "Tratamientos Capilares", genero: "unisex", precio: 100, duracion: 170, precioVariable: true, destacado: false },
  { nombre: "Tratamiento Max Relax", categoria: "Tratamientos Capilares", genero: "unisex", precio: 100, duracion: 190, precioVariable: true, destacado: false },
  { nombre: "Tratamiento Max Collagen", categoria: "Tratamientos Capilares", genero: "unisex", precio: 29.90, duracion: 80, destacado: false },
  { nombre: "Tratamiento Max Frizz", categoria: "Tratamientos Capilares", genero: "unisex", precio: 140, duracion: 260, precioVariable: true, destacado: false },
  { nombre: "Tratamiento Max Liss", categoria: "Tratamientos Capilares", genero: "unisex", precio: 200, duracion: 330, precioVariable: true, destacado: false },
  { nombre: "Tratamiento K18", categoria: "Tratamientos Capilares", genero: "unisex", precio: 10, duracion: 10, destacado: false },

  // LAVADOS Y TRATAMIENTOS
  { nombre: "Lavado y secado sin peinar", categoria: "Lavados y Tratamientos", genero: "unisex", precio: 14.90, duracion: 30, destacado: false },
  { nombre: "Hidratación intensa MO", categoria: "Lavados y Tratamientos", genero: "unisex", precio: 10, duracion: 30, destacado: false },
  { nombre: "Hidratación ultraligera MO", categoria: "Lavados y Tratamientos", genero: "unisex", precio: 10, duracion: 30, destacado: false },
  { nombre: "Reparación + hidratación capilar MO", categoria: "Lavados y Tratamientos", genero: "unisex", precio: 12, duracion: 30, destacado: false },
  { nombre: "Tratamiento antifrizz MO", categoria: "Lavados y Tratamientos", genero: "unisex", precio: 10, duracion: 40, destacado: false },

  // MOLDEADORES
  { nombre: "Moldeador (pelo corto)", categoria: "Moldeadores", genero: "mujer", precio: 50, duracion: 120, destacado: false },
  { nombre: "Moldeador (pelo medio)", categoria: "Moldeadores", genero: "mujer", precio: 60, duracion: 120, destacado: false },
  { nombre: "Moldeador (pelo largo)", categoria: "Moldeadores", genero: "mujer", precio: 70, duracion: 120, destacado: false },

  // DEPILACIONES
  { nombre: "Depilación cejas", categoria: "Depilaciones", genero: "unisex", precio: 6, duracion: 5, destacado: false },
  { nombre: "Depilación labio", categoria: "Depilaciones", genero: "unisex", precio: 6, duracion: 15, destacado: false },

  // EXTENSIONES
  { nombre: "1 trama extensiones (40cm)", categoria: "Extensiones", genero: "mujer", precio: 280, duracion: 45, destacado: false },
  { nombre: "1/2 trama extensiones (40cm)", categoria: "Extensiones", genero: "mujer", precio: 140, duracion: 30, destacado: false },
  { nombre: "Recolocar 1/2 trama", categoria: "Extensiones", genero: "mujer", precio: 50, duracion: 60, destacado: false },
  { nombre: "Recolocar 1 trama", categoria: "Extensiones", genero: "mujer", precio: 100, duracion: 90, destacado: false },
  { nombre: "1/4 trama extensiones (40cm)", categoria: "Extensiones", genero: "mujer", precio: 70, duracion: 20, destacado: false },
  { nombre: "1 trama extensiones (50cm)", categoria: "Extensiones", genero: "mujer", precio: 380, duracion: 60, destacado: false },
  { nombre: "1/2 extensiones (50cm)", categoria: "Extensiones", genero: "mujer", precio: 190, duracion: 30, destacado: false },
  { nombre: "1/4 trama extensiones (50cm)", categoria: "Extensiones", genero: "mujer", precio: 95, duracion: 20, destacado: false },
  { nombre: "Alquiler HALO", categoria: "Extensiones", genero: "mujer", precio: 120, duracion: 30, destacado: false },

  // PACKS OFERTAS LUNES A JUEVES
  { nombre: "Pack color + corte + peinado", categoria: "Packs Ofertas", genero: "unisex", precio: 59.90, duracion: 90, destacado: true, tipoPack: "laborables" },
  { nombre: "Peinado corto", categoria: "Packs Ofertas", genero: "unisex", precio: 19.90, duracion: 40, destacado: false, tipoPack: "laborables" },
  { nombre: "Peinado largo", categoria: "Packs Ofertas", genero: "unisex", precio: 23, duracion: 50, destacado: false, tipoPack: "laborables" },

  // PACKS FIN DE SEMANA
  { nombre: "Peinado pelo corto fin de semana", categoria: "Packs Fin de Semana", genero: "unisex", precio: 23, duracion: 40, destacado: false },
  { nombre: "Peinado pelo largo fin de semana", categoria: "Packs Fin de Semana", genero: "unisex", precio: 25, duracion: 45, destacado: false },
  { nombre: "Pack fin de semana color + corte + peinado", categoria: "Packs Fin de Semana", genero: "unisex", precio: 69.90, duracion: 120, destacado: true }
];

const ordenCategorias = [
  "Cortes y Peinados",
  "Coloración",
  "Mechas",
  "Tratamientos Capilares",
  "Lavados y Tratamientos",
  "Moldeadores",
  "Depilaciones",
  "Extensiones",
  "Packs Ofertas",
  "Packs Fin de Semana"
];

const descripcionesCategorias = {
  "Cortes y Peinados": "Forma, movimiento y acabado adaptados a tu estilo.",
  "Coloración": "Opciones de color para renovar, matizar o transformar.",
  "Mechas": "Servicios de mechas con atención al tono y al resultado.",
  "Tratamientos Capilares": "Cuidado específico según las necesidades de tu cabello.",
  "Lavados y Tratamientos": "Gestos esenciales para hidratar, reparar y mantener.",
  "Moldeadores": "Movimiento y textura en diferentes largos de cabello.",
  "Depilaciones": "Servicios precisos para completar tu visita.",
  "Extensiones": "Opciones de longitud y volumen con distintos formatos.",
  "Packs Ofertas": "Combinaciones disponibles de lunes a jueves.",
  "Packs Fin de Semana": "Combinaciones pensadas para las citas de fin de semana."
};

const etiquetasGenero = {
  mujer: "Mujer",
  hombre: "Hombre",
  infantil: "Infantil",
  unisex: "Para todos"
};

const estadoServicios = {
  filtro: "todos"
};

let categoriasObserver = null;

function formatearDuracion(minutos) {
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  return mins > 0 ? `${horas} h ${mins} min` : `${horas} h`;
}

function formatearPrecio(servicio) {
  const precio = new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: Number.isInteger(servicio.precio) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(servicio.precio);
  return `${servicio.precioVariable ? "Desde " : ""}${precio} €`;
}

function slugCategoria(categoria) {
  return categoria
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function serviciosPorFiltro(filtro) {
  if (filtro === "mujer") return serviciosData.filter((servicio) => servicio.genero === "mujer");
  if (filtro === "hombre") return serviciosData.filter((servicio) => servicio.genero === "hombre");
  if (filtro === "pack") return serviciosData.filter((servicio) => servicio.categoria.includes("Pack"));
  return serviciosData;
}

function abrirReserva(nombreServicio) {
  const telefono = "34916623438";
  const mensaje = encodeURIComponent(`Hola, me gustaría reservar el servicio: ${nombreServicio} en Go Estilistas.`);
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank", "noopener");
}

function abrirAsesoramiento() {
  const telefono = "34916623438";
  const mensaje = encodeURIComponent("Hola, me gustaría recibir asesoramiento para elegir el servicio más adecuado en Go Estilistas.");
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank", "noopener");
}

function renderizarDestacados() {
  const container = document.getElementById("destacadosContainer");
  if (!container) return;

  const destacados = serviciosData.filter((servicio) => servicio.destacado);
  container.innerHTML = destacados.map((servicio, index) => {
    const serviceIndex = serviciosData.indexOf(servicio);
    return `
      <article class="destacado-card">
        <span class="destacado-index" aria-hidden="true">0${index + 1}</span>
        <h3>${servicio.nombre}</h3>
        <div class="destacado-meta">
          <span>${servicio.categoria}</span>
          <span>${formatearDuracion(servicio.duracion)}</span>
        </div>
        <div class="destacado-actions">
          <span class="destacado-price">${formatearPrecio(servicio)}</span>
          <button class="servicio-boton" type="button" data-service-index="${serviceIndex}">Reservar <span aria-hidden="true">→</span></button>
        </div>
      </article>
    `;
  }).join("");
  window.GoMotion?.refresh();
}

function renderizarNavegacionCategorias(categorias) {
  const nav = document.getElementById("categoriasNav");
  if (!nav) return;

  nav.innerHTML = categorias.map((categoria) => `
    <button class="categoria-nav-btn" type="button" data-category-target="${slugCategoria(categoria)}">
      ${categoria}
    </button>
  `).join("");
}

function crearFilaServicio(servicio) {
  const serviceIndex = serviciosData.indexOf(servicio);
  return `
    <div class="servicio-row" data-service-index="${serviceIndex}">
      <div class="servicio-info">
        <div class="servicio-nombre">${servicio.nombre}</div>
        <span class="servicio-genero">${etiquetasGenero[servicio.genero] || servicio.genero}</span>
      </div>
      <span class="servicio-duracion">${formatearDuracion(servicio.duracion)}</span>
      <span class="servicio-precio">${formatearPrecio(servicio)}</span>
      <button class="servicio-boton" type="button" data-service-index="${serviceIndex}">
        Reservar <span aria-hidden="true">→</span>
      </button>
    </div>
  `;
}

function renderizarServicios(filtro = "todos") {
  const container = document.getElementById("categoriasContainer");
  const status = document.getElementById("serviciosStatus");
  if (!container) return;

  estadoServicios.filtro = filtro;
  const serviciosFiltrados = serviciosPorFiltro(filtro);
  const categoriasDisponibles = ordenCategorias.filter((categoria) =>
    serviciosFiltrados.some((servicio) => servicio.categoria === categoria)
  );
  const compactView = window.matchMedia("(max-width: 820px)").matches;

  if (status) {
    status.textContent = `${serviciosFiltrados.length} ${serviciosFiltrados.length === 1 ? "servicio" : "servicios"}`;
  }

  renderizarNavegacionCategorias(categoriasDisponibles);

  if (categoriasDisponibles.length === 0) {
    container.innerHTML = '<p class="no-servicios">No hay servicios disponibles para esta selección.</p>';
    return;
  }

  container.innerHTML = categoriasDisponibles.map((categoria, index) => {
    const serviciosCategoria = serviciosFiltrados.filter((servicio) => servicio.categoria === categoria);
    const slug = slugCategoria(categoria);
    const expanded = !compactView;
    const isPack = categoria.includes("Pack");
    return `
      <section class="categoria${isPack ? " is-pack" : ""}" id="categoria-${slug}" data-categoria="${slug}">
        <h3 class="categoria-titulo">
          <button
            class="categoria-toggle"
            type="button"
            aria-expanded="${expanded}"
            aria-controls="panel-${slug}"
          >
            <span>
              <span class="categoria-name">${categoria}</span>
              <span class="categoria-description">${descripcionesCategorias[categoria]}</span>
            </span>
            <span class="categoria-count">${serviciosCategoria.length} ${serviciosCategoria.length === 1 ? "servicio" : "servicios"}</span>
            <span class="categoria-chevron" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="categoria-panel" id="panel-${slug}"${expanded ? "" : " hidden"}>
          <div class="servicios-list">
            ${serviciosCategoria.map(crearFilaServicio).join("")}
          </div>
        </div>
      </section>
    `;
  }).join("");

  initCategorySpy();
  window.GoMotion?.refresh();
}

function initCategorySpy() {
  categoriasObserver?.disconnect();
  const sections = document.querySelectorAll(".categoria[data-categoria]");
  if (!("IntersectionObserver" in window) || !sections.length) return;
  const visibleCategories = new Set();

  const setActiveCategory = (slug) => {
    document.querySelectorAll(".categoria-nav-btn").forEach((button) => {
      const active = button.dataset.categoryTarget === slug;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  };

  categoriasObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleCategories.add(entry.target);
      else visibleCategories.delete(entry.target);
    });

    const anchor = window.innerHeight * 0.5;
    const activeSection = [...visibleCategories].sort((a, b) =>
      Math.abs(a.getBoundingClientRect().top - anchor) - Math.abs(b.getBoundingClientRect().top - anchor)
    )[0];
    if (activeSection) setActiveCategory(activeSection.dataset.categoria);
  }, {
    threshold: 0,
    rootMargin: "-45% 0px -45% 0px"
  });

  sections.forEach((section) => categoriasObserver.observe(section));
}

function actualizarFiltroActivo(filtroActivo) {
  document.querySelectorAll(".filtro-btn").forEach((button) => {
    const activo = button.dataset.filtro === filtroActivo;
    button.classList.toggle("active", activo);
    button.setAttribute("aria-pressed", String(activo));
  });
}

function initFiltros() {
  document.querySelectorAll(".filtro-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const filtro = button.dataset.filtro;
      actualizarFiltroActivo(filtro);
      const container = document.getElementById("categoriasContainer");
      if (window.GoMotion && container) {
        window.GoMotion.swap(container, () => renderizarServicios(filtro));
      } else {
        renderizarServicios(filtro);
      }
    });
  });
}

function initInteraccionesCatalogo() {
  document.addEventListener("click", (event) => {
    const reserveButton = event.target.closest(".servicio-boton");
    if (reserveButton) {
      const servicio = serviciosData[Number(reserveButton.dataset.serviceIndex)];
      if (servicio) abrirReserva(servicio.nombre);
      return;
    }

    const toggle = event.target.closest(".categoria-toggle");
    if (toggle) {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(toggle.getAttribute("aria-controls"));
      toggle.setAttribute("aria-expanded", String(!expanded));
      if (panel) {
        if (window.GoMotion) window.GoMotion.togglePanel(panel, !expanded);
        else panel.hidden = expanded;
      }
      return;
    }

    const categoryLink = event.target.closest(".categoria-nav-btn");
    if (categoryLink) {
      const section = document.getElementById(`categoria-${categoryLink.dataset.categoryTarget}`);
      const sectionToggle = section?.querySelector(".categoria-toggle");
      const panel = sectionToggle ? document.getElementById(sectionToggle.getAttribute("aria-controls")) : null;
      if (sectionToggle && panel) {
        sectionToggle.setAttribute("aria-expanded", "true");
        if (window.GoMotion) window.GoMotion.togglePanel(panel, true);
        else panel.hidden = false;
      }
      section?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start"
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarDestacados();
  renderizarServicios("todos");
  initFiltros();
  initInteraccionesCatalogo();

  document.getElementById("btnAsesoramiento")?.addEventListener("click", abrirAsesoramiento);
  document.getElementById("btnClosingAdvice")?.addEventListener("click", abrirAsesoramiento);

  const compactMedia = window.matchMedia("(max-width: 820px)");
  compactMedia.addEventListener("change", () => renderizarServicios(estadoServicios.filtro));
  window.GoMotion?.refresh();
});
