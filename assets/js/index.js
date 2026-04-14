// ============================================
// INDEX.JS - Lógica exclusiva de la página principal
// Partículas del hero + Carrusel de testimonios + Carrusel de imágenes
// ============================================

// ========== 1. PARTÍCULAS DEL HERO (versión llamativa) ==========
(function() {
    function initParticles() {
        const container = document.getElementById('particleContainer');
        if (!container) return;
        
        // Asegurar que el contenedor tiene position relative
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.position = 'relative';
        }
        
        // Limpiar contenedor por si ya tenía partículas
        container.innerHTML = '';
        
        // MÁS PARTÍCULAS: 120
        const PARTICLE_COUNT = 120;
        
        // Colores vivos
        const colors = [
            '#4EA8DE',  // Azul
            '#FF9F4A',  // Naranja
            '#6CB4EE',  // Azul claro
            '#FFB06A'   // Naranja claro
        ];
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Tamaño: 4-10px
            const size = Math.random() * 6 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Posición inicial aleatoria
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Color aleatorio
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.4 + 0.3;
            particle.style.backgroundColor = color;
            particle.style.opacity = opacity;
            
            // Sombra para que destaquen
            particle.style.boxShadow = `0 0 8px ${color}`;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            
            // Movimiento: 8-15 segundos
            const duration = Math.random() * 7 + 8;
            
            // Movimiento amplio
            const moveX = (Math.random() - 0.5) * 400;
            const moveY = (Math.random() - 0.5) * 400;
            
            // Animación
            const keyframes = [
                { transform: 'translate(0, 0)' },
                { transform: `translate(${moveX}px, ${moveY}px)` },
                { transform: 'translate(0, 0)' }
            ];
            
            const options = {
                duration: duration * 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            };
            
            particle.animate(keyframes, options);
            
            return particle;
        }
        
        // Crear todas las partículas
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            container.appendChild(createParticle());
        }
        
        console.log(`Creadas ${PARTICLE_COUNT} partículas llamativas en el hero`);
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
            texto: "He probado el centro por primera vez y no puedo estar más encantada. Desde el primer momento, Virginia me asesoró con una atención de diez, haciéndome sentir como si nos conociéramos de toda la vida. Es súper simpática, atenta y empática. ¡Da gusto encontrar profesionales así! He salido feliz con el resultado, tanto que nada más salir he pedido cita para la semana que viene. ¡Recomendadísima!",
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
    
    function initCarruselTestimonios() {
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
                initCarruselTestimonios();
            });
        } else {
            renderTestimonios();
            initCarruselTestimonios();
        }
    }
})();

// ========== 3. CARRUSEL DE IMÁGENES DEL HERO ==========
(function() {
    // Array de imágenes (CAMBIAR POR LAS IMÁGENES REALES DE LA PELUQUERÍA)
    const imagenesCarrusel = [
        {
            src: "assets/img/img-index/imagen1.png",
            alt: "Imagen 1"
        },
        {
            src: "assets/img/img-index/imagen2.png",
            alt: "Imagen 2"
        },
        {
            src: "assets/img/img-index/imagen3.png",
            alt: "Imagen 3"
        },
        {
            src: "assets/img/img-index/imagen4.png",
            alt: "Imagen 4"
        }
    ];
    
    let currentIndex = 0;
    let autoScrollInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Renderizar imágenes
    function renderCarruselImagenes() {
        const container = document.getElementById('carruselSlides');
        const dotsContainer = document.getElementById('carruselDots');
        
        if (!container || !dotsContainer) return;
        
        // Renderizar slides
        container.innerHTML = imagenesCarrusel.map((img, index) => `
            <div class="carrusel-slide ${index === currentIndex ? 'active' : ''}" data-index="${index}">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
        `).join('');
        
        // Renderizar dots
        dotsContainer.innerHTML = imagenesCarrusel.map((_, index) => `
            <div class="carrusel-dot ${index === currentIndex ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
        
        // Añadir eventos a los dots
        document.querySelectorAll('.carrusel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                goToSlide(index);
                resetAutoScroll();
            });
        });
    }
    
    // Ir a un slide específico
    function goToSlide(index) {
        if (index < 0) index = imagenesCarrusel.length - 1;
        if (index >= imagenesCarrusel.length) index = 0;
        
        currentIndex = index;
        
        // Actualizar slides
        const slides = document.querySelectorAll('.carrusel-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        
        // Actualizar dots
        const dots = document.querySelectorAll('.carrusel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Siguiente slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Anterior slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Auto-scroll
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
    }
    
    function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }
    
    // Swipe táctil para móvil
    function setupSwipe() {
        const carruselContainer = document.querySelector('.carrusel-container');
        if (!carruselContainer) return;
        
        carruselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoScroll();
        });
        
        carruselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoScroll();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
        }
    }
    
    // Inicializar carrusel
    function initCarruselImagenes() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Verificar que los botones existan (son los del carrusel de imágenes)
        // Nota: Los botones del carrusel de testimonios tienen otros IDs
        const carruselPrevBtn = document.querySelector('.hero-imagen .prev-btn');
        const carruselNextBtn = document.querySelector('.hero-imagen .next-btn');
        
        if (!carruselPrevBtn || !carruselNextBtn) return;
        
        renderCarruselImagenes();
        
        carruselPrevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoScroll();
        });
        
        carruselNextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoScroll();
        });
        
        startAutoScroll();
        setupSwipe();
        
        // Pausar auto-scroll cuando el mouse está sobre el carrusel
        const carruselContainer = document.querySelector('.carrusel-container');
        if (carruselContainer) {
            carruselContainer.addEventListener('mouseenter', stopAutoScroll);
            carruselContainer.addEventListener('mouseleave', startAutoScroll);
        }
        
        console.log('Carrusel de imágenes del hero inicializado');
    }
    
    // Inicializar carrusel si existe el contenedor
    if (document.getElementById('carruselSlides')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCarruselImagenes);
        } else {
            initCarruselImagenes();
        }
    }
})();