(() => {
  const equipoData = [
    {
      src: "https://placehold.co/800x500/4EA8DE/white?text=Equipo+GoEstilistas",
      alt: "Equipo GoEstilistas",
      nombre: "El equipo GoEstilistas",
      rol: "Tu estilo, nuestra pasión",
      esEquipo: true
    },
    {
      src: "https://placehold.co/800x500/FF9F4A/white?text=Trabajadora+1",
      alt: "Trabajadora 1",
      nombre: "Gema Martínez",
      rol: "Especialista en coloración",
      esEquipo: false
    },
    {
      src: "https://placehold.co/800x500/4EA8DE/white?text=Trabajadora+2",
      alt: "Trabajador 2",
      nombre: "Orlando",
      rol: "Estilista senior",
      esEquipo: false
    },
    {
      src: "https://placehold.co/800x500/FF9F4A/white?text=Trabajadora+3",
      alt: "Trabajadora 3",
      nombre: "Carmela Ruiz",
      rol: "Especialista en cortes",
      esEquipo: false
    },
    {
      src: "https://placehold.co/800x500/4EA8DE/white?text=Trabajador+4",
      alt: "Trabajador 4",
      nombre: "Virginia Lopez",
      rol: "Estilista femenina",
      esEquipo: false
    }
  ];

  const isPlaceholder = (src) => src.includes("placehold.co");

  function createMedia(item, className) {
    if (isPlaceholder(item.src)) {
      return `
        <div class="${className} portrait-placeholder" role="img" aria-label="Retrato pendiente de ${item.nombre}">
          <span>Retrato pendiente</span>
        </div>
      `;
    }

    return `
      <div class="${className}">
        <img src="${item.src}" alt="${item.alt}" width="800" height="1000" loading="lazy" decoding="async">
      </div>
    `;
  }

  function renderTeam() {
    const overviewContainer = document.getElementById("teamOverview");
    const teamContainer = document.getElementById("teamGrid");
    if (!overviewContainer || !teamContainer) return;

    const overview = equipoData.find((item) => item.esEquipo);
    const profiles = equipoData.filter((item) => !item.esEquipo);

    if (overview) {
      overviewContainer.innerHTML = `
        <article class="team-overview-entry">
          ${createMedia(overview, "team-overview-media")}
          <div class="team-overview-content">
            <h3>${overview.nombre}</h3>
            <p>${overview.rol}</p>
          </div>
        </article>
      `;
    }

    teamContainer.innerHTML = profiles.map((item) => `
      <article class="team-profile">
        ${createMedia(item, "team-profile-media")}
        <h3>${item.nombre}</h3>
        <p>${item.rol}</p>
      </article>
    `).join("");
  }

  function openReservation() {
    const message = encodeURIComponent("Hola, me gustaría reservar una cita en Go Estilistas.");
    window.open(`https://wa.me/34916623438?text=${message}`, "_blank", "noopener,noreferrer");
  }

  function initAboutPage() {
    renderTeam();
    document.getElementById("btnAboutReserve")?.addEventListener("click", openReservation);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAboutPage, { once: true });
  } else {
    initAboutPage();
  }
})();
