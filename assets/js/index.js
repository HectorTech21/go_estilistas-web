// ============================================
// INDEX.JS - Lógica exclusiva de la página principal
// Partículas del hero + Carrusel de testimonios
// ============================================

// ========== 1. PARTÍCULAS DEL HERO ==========
(function() {
    function initParticles() {
        const container = document.getElementById('particleContainer');
        if (!container) return;
        
        const PARTICLE_COUNT = 80;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            const colorVariation = Math.random();
            if (colorVariation > 0.7) {
                particle.style.background = 'rgba(255, 140, 0, 0.5)';
            } else {
                particle.style.background = 'rgba(255, 255, 255, 0.4)';
            }
            
            return particle;
        }
        
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            container.appendChild(createParticle());
        }
    }
    
    if (document.getElementById('particleContainer')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initParticles);
        } else {
            initParticles();
        }
    }
})();

// ========== 2. CARRUSEL DE TESTIMONIOS ==========
(function() {
        const testimonios = [
        {
            nombre: "Noushinmehdi Farasatrahimi",
            avatar: "NF",
            texto: "Hoy tocaba pelu y, una vez más, Go Estilistas no falla. Gema es puro acierto: cercana, profesional y con unas manos increíbles. Me hice mechas balayage y el resultado es espectacular, un acabado impecable, justo como quería. Se nota cuando alguien ama lo que hace y cuida cada detalle. Encima, precios súper asequibles. Salgo feliz y con pelazo 💁‍♀️✨",
            estrellas: 5,
            fecha: "Hace poco"
        },
        {
            nombre: "Cristina Agasid Layugan",
            avatar: "CL",
            texto: "He probado el centro por primera vez y no puedo estar más encantada.Desde el primer momento, Virginia me asesoró con una atención de diez, haciéndome sentir como si nos conociéramos de toda la vida. Es súper simpática, atenta y empática. ¡Da gusto encontrar profesionales así! He salido feliz con el resultado, tanto que nada más salir he pedido cita para la semana que viene. ¡Recomendadísima!",
            estrellas: 5,
            fecha: "Hace poco"
        },
        {
            nombre: "Yuval Bello",
            avatar: "YB",
            texto: "Fui a esta peluquería con mi tía hace unas semanas y la experiencia fue excelente. La atendió Carmela, que es una gran profesional. Le cortó el pelo de una manera espectacular y el resultado quedó precioso. Además de trabajar muy bien, Carmela fue muy amable y atenta en todo momento, lo que hizo que la experiencia fuera todavía mejor. Sin duda, la recomiendo.",
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
        let estrellas = '';
        for (let i = 0; i < 5; i++) {
            estrellas += i < cantidad ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        return estrellas;
    }
    
    function renderTestimonios() {
    const container = document.getElementById('testimoniosCarrusel');
    if (!container) return;
    
    container.innerHTML = testimonios.map(t => `
        <div class="testimonio-card">
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
        </div>
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
            const totalCards = testimonios.length;
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => scrollToCard(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        function scrollToCard(index) {
            const cardWidth = container.children[0]?.offsetWidth + 24 || 344;
            currentIndex = Math.min(Math.max(0, index), testimonios.length - 1);
            container.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
            updateDots();
        }
        
        function nextSlide() {
            if (currentIndex < testimonios.length - 1) {
                scrollToCard(currentIndex + 1);
            } else {
                scrollToCard(0);
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                scrollToCard(currentIndex - 1);
            } else {
                scrollToCard(testimonios.length - 1);
            }
        }
        
        function startAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => nextSlide(), 5000);
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        }
        
        nextBtn.addEventListener('click', () => { nextSlide(); stopAutoScroll(); startAutoScroll(); });
        prevBtn.addEventListener('click', () => { prevSlide(); stopAutoScroll(); startAutoScroll(); });
        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
        
        updateDots();
        startAutoScroll();
    }
    
    if (document.getElementById('testimoniosCarrusel')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                renderTestimonios();
                initCarrusel();
            });
        } else {
            renderTestimonios();
            initCarrusel();
        }
    }
})();