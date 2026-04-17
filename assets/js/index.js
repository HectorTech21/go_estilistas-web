// ============================================
// INDEX.JS - Lógica exclusiva de la página principal
// Partículas del hero + Carrusel de testimonios + Carrusel de imágenes
// ============================================

// ========== 1. PARTÍCULAS DEL HERO (versión llamativa) ==========
(function() {
    function initParticles() {
        const container = document.getElementById('particleContainer');
        if (!container) return;
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.position = 'relative';
        }
        
        container.innerHTML = '';
        
        const PARTICLE_COUNT = 120;
        const colors = ['#4EA8DE', '#FF9F4A', '#6CB4EE', '#FFB06A'];
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 6 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.4 + 0.3;
            particle.style.backgroundColor = color;
            particle.style.opacity = opacity;
            particle.style.boxShadow = `0 0 8px ${color}`;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            
            const duration = Math.random() * 7 + 8;
            const moveX = (Math.random() - 0.5) * 400;
            const moveY = (Math.random() - 0.5) * 400;
            
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
        
        container.innerHTML = testimonios.map((t, idx) => `
            <div class="testimonio-card" data-idx="${idx}">
                <div class="testimonio-estrellas">${renderEstrellas(t.estrellas)}</div>
                <div class="testimonio-texto-container">
                    <p class="testimonio-texto" id="texto-${idx}">${t.texto}</p>
                </div>
                <button class="testimonio-ver-mas" data-idx="${idx}">Ver más</button>
                <div class="testimonio-autor">
                    <div class="testimonio-avatar">${t.avatar}</div>
                    <div class="testimonio-info">
                        <h4>${t.nombre}</h4>
                        <p>${t.fecha}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Inicializar botones "Ver más / Ver menos"
        document.querySelectorAll('.testimonio-ver-mas').forEach(btn => {
            const idx = btn.dataset.idx;
            const textoElement = document.getElementById(`texto-${idx}`);
            const textoCompleto = testimonios[idx].texto;
            let expanded = false;
            
            function setInitialText() {
                if (textoCompleto.length > 200) {
                    textoElement.textContent = textoCompleto.substring(0, 200) + '...';
                    btn.textContent = 'Ver más';
                    btn.style.display = 'block';
                } else {
                    textoElement.textContent = textoCompleto;
                    btn.style.display = 'none';
                }
                expanded = false;
            }
            
            btn.addEventListener('click', () => {
                if (!expanded) {
                    textoElement.textContent = textoCompleto;
                    btn.textContent = 'Ver menos';
                    expanded = true;
                } else {
                    textoElement.textContent = textoCompleto.substring(0, 200) + '...';
                    btn.textContent = 'Ver más';
                    expanded = false;
                }
            });
            
            setInitialText();
        });
    }
    
    function initCarruselTestimonios() {
        const container = document.getElementById('testimoniosCarrusel');
        const prevBtn = document.querySelector('.testimonio-prev');
        const nextBtn = document.querySelector('.testimonio-next');
        const dotsContainer = document.querySelector('.testimonios-dots');
        
        if (!container || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        let autoScrollInterval;
        const totalCards = testimonios.length;
        
        function updateDots() {
            if (!dotsContainer) return;
            
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => scrollToIndex(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        function scrollToIndex(index) {
            const firstCard = container.querySelector('.testimonio-card');
            if (!firstCard) return;
            
            const cardStyle = getComputedStyle(firstCard);
            const cardWidth = firstCard.offsetWidth;
            const marginLeft = parseInt(cardStyle.marginLeft) || 0;
            const marginRight = parseInt(cardStyle.marginRight) || 0;
            const slideWidth = cardWidth + marginLeft + marginRight;
            
            currentIndex = Math.min(Math.max(0, index), totalCards - 1);
            const scrollPosition = currentIndex * slideWidth;
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            updateDots();
        }
        
        function nextSlide() {
            if (currentIndex < totalCards - 1) {
                scrollToIndex(currentIndex + 1);
            } else {
                scrollToIndex(0);
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                scrollToIndex(currentIndex - 1);
            } else {
                scrollToIndex(totalCards - 1);
            }
        }
        
        function startAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(() => nextSlide(), 5000);
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        }
        
        function resetAutoScroll() {
            stopAutoScroll();
            startAutoScroll();
        }
        
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoScroll(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoScroll(); });
        
        container.addEventListener('scroll', () => {
            const firstCard = container.querySelector('.testimonio-card');
            if (!firstCard) return;
            
            const cardStyle = getComputedStyle(firstCard);
            const cardWidth = firstCard.offsetWidth;
            const marginLeft = parseInt(cardStyle.marginLeft) || 0;
            const marginRight = parseInt(cardStyle.marginRight) || 0;
            const slideWidth = cardWidth + marginLeft + marginRight;
            
            const newIndex = Math.round(container.scrollLeft / slideWidth);
            if (newIndex !== currentIndex && !isNaN(newIndex) && newIndex >= 0 && newIndex < totalCards) {
                currentIndex = newIndex;
                updateDots();
            }
        });
        
        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
        
        updateDots();
        startAutoScroll();
        
        setTimeout(() => {
            scrollToIndex(0);
        }, 100);
        
        window.addEventListener('resize', () => {
            setTimeout(() => {
                scrollToIndex(currentIndex);
            }, 100);
        });
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
    const imagenesCarrusel = [
        {
            src: "https://placehold.co/700x500/4EA8DE/white?text=Imagen+1",
            alt: "Peluquería GoEstilistas - Imagen 1"
        },
        {
            src: "https://placehold.co/700x500/FF9F4A/white?text=Imagen+2",
            alt: "Peluquería GoEstilistas - Imagen 2"
        },
        {
            src: "https://placehold.co/700x500/4EA8DE/white?text=Imagen+3",
            alt: "Peluquería GoEstilistas - Imagen 3"
        },
        {
            src: "https://placehold.co/700x500/FF9F4A/white?text=Imagen+4",
            alt: "Peluquería GoEstilistas - Imagen 4"
        }
    ];
    
    let currentIndex = 0;
    let autoScrollInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function renderCarruselImagenes() {
        const container = document.getElementById('carruselSlides');
        const dotsContainer = document.querySelector('.carrusel-dots');
        
        if (!container || !dotsContainer) return;
        
        container.innerHTML = imagenesCarrusel.map((img, index) => `
            <div class="carrusel-slide ${index === currentIndex ? 'active' : ''}" data-index="${index}">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
        `).join('');
        
        dotsContainer.innerHTML = imagenesCarrusel.map((_, index) => `
            <div class="carrusel-dot ${index === currentIndex ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
        
        document.querySelectorAll('.carrusel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                goToSlide(index);
                resetAutoScroll();
            });
        });
    }
    
    function goToSlide(index) {
        if (index < 0) index = imagenesCarrusel.length - 1;
        if (index >= imagenesCarrusel.length) index = 0;
        
        currentIndex = index;
        
        const slides = document.querySelectorAll('.carrusel-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        
        const dots = document.querySelectorAll('.carrusel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => nextSlide(), 5000);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
    }
    
    function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }
    
    function setupSwipe() {
        const carruselContainer = document.querySelector('.carrusel-container');
        if (!carruselContainer) return;
        
        carruselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoScroll();
        });
        
        carruselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
            startAutoScroll();
        });
    }
    
    function initCarruselImagenes() {
        const prevBtn = document.querySelector('.hero-imagen .prev-btn');
        const nextBtn = document.querySelector('.hero-imagen .next-btn');
        
        if (!prevBtn || !nextBtn) return;
        
        renderCarruselImagenes();
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoScroll();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoScroll();
        });
        
        startAutoScroll();
        setupSwipe();
        
        const carruselContainer = document.querySelector('.carrusel-container');
        if (carruselContainer) {
            carruselContainer.addEventListener('mouseenter', stopAutoScroll);
            carruselContainer.addEventListener('mouseleave', startAutoScroll);
        }
        
        console.log('Carrusel de imágenes del hero inicializado');
    }
    
    if (document.getElementById('carruselSlides')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCarruselImagenes);
        } else {
            initCarruselImagenes();
        }
    }
})();