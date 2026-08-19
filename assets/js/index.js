// Home: testimonios editoriales y reserva contextual.
document.addEventListener('DOMContentLoaded', () => {
  const testimonios = [
    {
      nombre: 'Noushinmehdi Farasatrahimi',
      avatar: 'NF',
      texto: 'Hoy tocaba pelu y, una vez más, Go Estilistas no falla. Gema es puro acierto: cercana, profesional y con unas manos increíbles. Me hice mechas balayage y el resultado es espectacular, un acabado impecable, justo como quería. Se nota cuando alguien ama lo que hace y cuida cada detalle. Encima, precios súper asequibles. Salgo feliz y con pelazo.',
      estrellas: 5,
      fecha: 'Hace poco'
    },
    {
      nombre: 'Cristina Agasid Layugan',
      avatar: 'CL',
      texto: 'He probado el centro por primera vez y no puedo estar más encantada. Desde el primer momento, Virginia me asesoró con una atención de diez, haciéndome sentir como si nos conociéramos de toda la vida. Es súper simpática, atenta y empática. ¡Da gusto encontrar profesionales así! He salido feliz con el resultado, tanto que nada más salir he pedido cita para la semana que viene. ¡Recomendadísima!',
      estrellas: 5,
      fecha: 'Hace poco'
    },
    {
      nombre: 'Yuval Bello',
      avatar: 'YB',
      texto: 'Fui a esta peluquería con mi tía hace unas semanas y la experiencia fue excelente. La atendió Carmela, que es una gran profesional. Le cortó el pelo de una manera espectacular y el resultado quedó precioso. Además de trabajar muy bien, Carmela fue muy amable y atenta en todo momento, lo que hizo que la experiencia fuera todavía mejor. Sin duda, la recomiendo.',
      estrellas: 5,
      fecha: 'Hace poco'
    },
    {
      nombre: 'Eric Barclay',
      avatar: 'EB',
      texto: 'Excelente servicio y trato muy amable. Virginia me cortó el pelo con mucha paciencia y atención al detalle; quedé muy contento con el resultado.',
      estrellas: 5,
      fecha: 'Hace poco'
    },
    {
      nombre: 'Margarita Lacasa Hernández',
      avatar: 'ML',
      texto: '¡Gran equipo! Productos de alta calidad, trato inmejorable y atención personalizada. Súper recomendable.',
      estrellas: 5,
      fecha: 'Hace poco'
    }
  ];

  const container = document.getElementById('testimoniosCarrusel');
  const prevButton = document.getElementById('prevBtnTestimonios');
  const nextButton = document.getElementById('nextBtnTestimonios');
  const dotsContainer = document.getElementById('testimoniosDots');

  if (container && prevButton && nextButton && dotsContainer) {
    container.innerHTML = testimonios.map((testimonio, index) => `
      <article class="testimonio-card" data-index="${index}">
        <div class="testimonio-estrellas" role="img" aria-label="${testimonio.estrellas} de 5 estrellas">
          ${'★'.repeat(testimonio.estrellas)}
        </div>
        <div class="testimonio-texto-container">
          <p class="testimonio-texto" id="testimonio-texto-${index}"></p>
        </div>
        <button class="testimonio-ver-mas" type="button" data-index="${index}" aria-expanded="false">
          Ver más
        </button>
        <div class="testimonio-autor">
          <span class="testimonio-avatar" aria-hidden="true">${testimonio.avatar}</span>
          <div class="testimonio-info">
            <h4>${testimonio.nombre}</h4>
            <p>${testimonio.fecha}</p>
          </div>
        </div>
      </article>
    `).join('');

    document.querySelectorAll('.testimonio-ver-mas').forEach((button) => {
      const index = Number(button.dataset.index);
      const textElement = document.getElementById(`testimonio-texto-${index}`);
      const fullText = testimonios[index].texto;
      const excerptLength = 210;

      if (!textElement) return;

      if (fullText.length <= excerptLength) {
        textElement.textContent = fullText;
        button.hidden = true;
        return;
      }

      const collapsedText = `${fullText.slice(0, excerptLength).trim()}…`;
      textElement.textContent = collapsedText;

      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        button.textContent = expanded ? 'Ver más' : 'Ver menos';
        textElement.textContent = expanded ? collapsedText : fullText;
      });
    });

    let currentPage = 0;
    let totalPages = 1;
    let scrollFrame = null;

    const getStep = () => {
      const firstCard = container.querySelector('.testimonio-card');
      if (!firstCard) return container.clientWidth;
      const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const calculatePages = () => {
      const step = getStep();
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
      totalPages = Math.max(1, Math.ceil(maxScroll / step) + 1);
      currentPage = Math.min(currentPage, totalPages - 1);
    };

    const updateDots = () => {
      calculatePages();
      dotsContainer.innerHTML = Array.from({ length: totalPages }, (_, index) => `
        <button
          class="dot${index === currentPage ? ' active' : ''}"
          type="button"
          data-page="${index}"
          aria-label="Ir al grupo de testimonios ${index + 1}"
          ${index === currentPage ? 'aria-current="true"' : ''}
        ></button>
      `).join('');

      dotsContainer.querySelectorAll('.dot').forEach((dot) => {
        dot.addEventListener('click', () => goToPage(Number(dot.dataset.page)));
      });

      prevButton.disabled = totalPages <= 1;
      nextButton.disabled = totalPages <= 1;
    };

    const goToPage = (page) => {
      currentPage = (page + totalPages) % totalPages;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      container.scrollTo({
        left: Math.min(currentPage * getStep(), container.scrollWidth - container.clientWidth),
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
      updateDots();
    };

    prevButton.addEventListener('click', () => goToPage(currentPage - 1));
    nextButton.addEventListener('click', () => goToPage(currentPage + 1));

    container.addEventListener('scroll', () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const step = getStep();
        const newPage = Math.min(totalPages - 1, Math.max(0, Math.round(container.scrollLeft / step)));
        if (newPage !== currentPage) {
          currentPage = newPage;
          updateDots();
        }
      });
    }, { passive: true });

    window.addEventListener('resize', () => {
      calculatePages();
      updateDots();
    });

    updateDots();
  }

  const heroReserveButton = document.getElementById('btnReservaHero');
  if (heroReserveButton) {
    heroReserveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const message = encodeURIComponent('Hola, me gustaría reservar una cita en Go Estilistas.');
      window.open(`https://wa.me/34916623438?text=${message}`, '_blank', 'noopener');
    });
  }
});
