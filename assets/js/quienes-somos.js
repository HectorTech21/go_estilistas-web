// ============================================
// QUIENES-SOMOS.JS - Lógica de la página Quiénes somos
// Carrusel de equipo + Contador animado
// ============================================

// ========== 1. CARRUSEL DE EQUIPO ==========
(function() {
    // Datos del equipo (CAMBIAR POR LAS IMÁGENES REALES)
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
    
    let currentIndex = 0;
    let autoScrollInterval;
    
    function renderCarruselEquipo() {
        const container = document.querySelector('.carrusel-equipo');
        const dotsContainer = document.querySelector('.carrusel-equipo-dots');
        
        if (!container || !dotsContainer) return;
        
        // Renderizar slides
        container.innerHTML = equipoData.map((item, index) => `
            <div class="carrusel-equipo-slide" data-index="${index}">
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
                <div class="slide-caption">
                    <h3>${item.nombre}</h3>
                    <p>${item.rol}</p>
                </div>
            </div>
        `).join('');
        
        // Renderizar dots
        dotsContainer.innerHTML = equipoData.map((_, index) => `
            <div class="carrusel-equipo-dot ${index === currentIndex ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
        
        // Añadir eventos a los dots
        document.querySelectorAll('.carrusel-equipo-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                goToSlide(index);
                resetAutoScroll();
            });
        });
        
        updateSlidePosition();
    }
    
    function updateSlidePosition() {
        const container = document.querySelector('.carrusel-equipo');
        if (!container) return;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar dots
        const dots = document.querySelectorAll('.carrusel-equipo-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        if (index < 0) index = equipoData.length - 1;
        if (index >= equipoData.length) index = 0;
        currentIndex = index;
        updateSlidePosition();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
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
    
    function initCarruselEquipo() {
        const prevBtn = document.getElementById('prevEquipoBtn');
        const nextBtn = document.getElementById('nextEquipoBtn');
        
        if (!prevBtn || !nextBtn) return;
        
        renderCarruselEquipo();
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoScroll();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoScroll();
        });
        
        // Pausar auto-scroll al hacer hover
        const carruselContainer = document.querySelector('.carrusel-equipo-container');
        if (carruselContainer) {
            carruselContainer.addEventListener('mouseenter', stopAutoScroll);
            carruselContainer.addEventListener('mouseleave', startAutoScroll);
        }
        
        startAutoScroll();
        console.log('Carrusel de equipo inicializado');
    }
    
    if (document.querySelector('.carrusel-equipo-container')) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCarruselEquipo);
        } else {
            initCarruselEquipo();
        }
    }
})();

// ========== 2. CONTADOR ANIMADO (COUNT-UP) ==========
(function() {
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        const counters = document.querySelectorAll('.estadistica-numero');
        if (!counters.length) return;
        
        // Verificar si la sección está visible
        const statsSection = document.getElementById('estadisticas');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !animated) {
            animated = true;
            
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const isFloat = target % 1 !== 0;
                let current = 0;
                const increment = target / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const updateCounter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = isFloat ? target.toFixed(1) : Math.floor(target);
                        clearInterval(updateCounter);
                    } else {
                        counter.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
                    }
                }, stepTime);
            });
        }
    }
    
    // Escuchar scroll
    window.addEventListener('scroll', animateNumbers);
    window.addEventListener('load', animateNumbers);
})();