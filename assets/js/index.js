// ============================================
// INDEX.JS - CARRUSEL DE TESTIMONIOS
// (Partículas eliminadas por limpieza visual)
// ============================================

(function() {
    const testimonios = [
        {
            nombre: "Noushinmehdi Farasatrahimi",
            avatar: "NF",
            texto: "Hoy tocaba pelu y, una vez más, Go Estilistas no falla. Gema es puro acierto: cercana, profesional y con unas manos increíbles. Me hice mechas balayage y el resultado es espectacular, un acabado impecable, justo como quería. Se nota cuando alguien ama lo que hace y cuida cada detalle. Encima, precios súper asequibles.",
            estrellas: 5,
            fecha: "Hace poco"
        },
        {
            nombre: "Cristina Agasid Layugan",
            avatar: "CL",
            texto: "He probado el centro por primera vez y no puedo estar más encantada. Desde el primer momento, Virginia me asesoró con una atención de diez, haciéndome sentir como si nos conociéramos de toda la vida. Es súper simpática, atenta y empática. ¡Da gusto encontrar profesionales así!",
            estrellas: 5,
            fecha: "Hace poco"
        },
        {
            nombre: "Yuval Bello",
            avatar: "YB",
            texto: "Fui a esta peluquería con mi tía hace unas semanas y la experiencia fue excelente. La atendió Carmela, que es una gran profesional. Le cortó el pelo de una manera espectacular y el resultado quedó precioso. Además de trabajar muy bien, Carmela fue muy amable y atenta en todo momento.",
            estrellas: 5,
            fecha: "Hace poco"
        },
        {
            nombre: "Eric Barclay",
            avatar: "EB",
            texto: "Excelente servicio y trato muy amable, Virginia me cortó el pelo con mucha paciencia y atención al detalle, quedé muy contento con el resultado.",
            estrellas: 5,
            fecha: "Hace poco"
        },
        {
            nombre: "Margarita Lacasa Hernández",
            avatar: "ML",
            texto: "Gran equipo! Productos de alta calidad! Trato inmejorable y atención personalizada. Super recomendable!",
            estrellas: 5,
            fecha: "Hace poco"
        }
    ];
    
    function renderEstrellas(cantidad) {
        let html = '';
        for (let i = 0; i < 5; i++) {
            html += i < cantidad ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        return html;
    }
    
    function renderTestimonios() {
        const container = document.getElementById('testimoniosCarrusel');
        if (!container) return;
        
        container.innerHTML = testimonios.map(t => `
            <article class="testimonio-card">
                <div class="testimonio-estrellas">${renderEstrellas(t.estrellas)}</div>
                <div class="testimonio-texto-container">
                    <p class="testimonio-texto">"${t.texto}"</p>
                </div>
                <div class="testimonio-autor">
                    <div class="testimonio-avatar">${t.avatar}</div>
                    <div class="testimonio-info">
                        <h4>${t.nombre}</h4>
                        <p>${t.fecha}</p>
                    </div>
                </div>
            </article>
        `).join('');
    }
    
    function initCarrusel() {
        const container = document.getElementById('testimoniosCarrusel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carruselDots');
        
        if (!container || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        let autoScrollInterval;
        
        function updateDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            testimonios.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => scrollToCard(i));
                dotsContainer.appendChild(dot);
            });
        }
        
        function scrollToCard(index) {
            const cardWidth = container.children[0]?.offsetWidth + 24; // gap incluido
            currentIndex = Math.min(Math.max(0, index), testimonios.length - 1);
            container.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
            updateDots();
        }
        
        function nextSlide() {
            scrollToCard(currentIndex < testimonios.length - 1 ? currentIndex + 1 : 0);
        }
        
        function prevSlide() {
            scrollToCard(currentIndex > 0 ? currentIndex - 1 : testimonios.length - 1);
        }
        
        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        }
        
        nextBtn.addEventListener('click', () => { nextSlide(); startAutoScroll(); });
        prevBtn.addEventListener('click', () => { prevSlide(); startAutoScroll(); });
        
        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
        
        // Soporte táctil básico
        let touchStartX = 0;
        container.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, {passive: true});
        container.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) nextSlide();
            else if (touchEndX - touchStartX > 50) prevSlide();
            startAutoScroll();
        }, {passive: true});
        
        updateDots();
        startAutoScroll();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderTestimonios();
            initCarrusel();
        });
    } else {
        renderTestimonios();
        initCarrusel();
    }
})();