// ============================================
// TRABAJOS.JS - Datos y lógica de la galería de trabajos
// CON CARRUSEL INTERNO EN CADA CARD + LIGHTBOX
// ============================================

// Datos de trabajos (ejemplo - CAMBIAR POR IMÁGENES REALES)
// Cada servicio puede tener múltiples parejas de antes/después
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

// ============================================
// VARIABLES GLOBALES DEL LIGHTBOX
// ============================================
let lightboxActive = false;
let currentCardId = null;
let currentImageIndex = 0;
let currentImagesArray = []; // Array de objetos { antes, despues }
let currentImageUrls = []; // Array plano de URLs (para navegación en lightbox)

// ============================================
// FUNCIONES DEL LIGHTBOX
// ============================================

// Abrir lightbox con la imagen clickada
function openLightbox(cardId, imageIndex, imageType) {
    const trabajo = trabajosData.find(t => t.id === cardId);
    if (!trabajo) return;
    
    currentCardId = cardId;
    currentImagesArray = trabajo.imagenes;
    
    // Construir array plano de URLs (todas las imágenes, tanto antes como después)
    currentImageUrls = [];
    trabajo.imagenes.forEach(img => {
        currentImageUrls.push({ url: img.antes, type: 'antes', nombre: trabajo.nombre });
        currentImageUrls.push({ url: img.despues, type: 'despues', nombre: trabajo.nombre });
    });
    
    // Calcular el índice en el array plano
    // Cada par de imágenes (antes, después) ocupa 2 posiciones
    currentImageIndex = (imageIndex * 2) + (imageType === 'antes' ? 0 : 1);
    
    // Actualizar lightbox
    updateLightboxImage();
    updateLightboxCounter();
    
    // Mostrar lightbox
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        lightboxActive = true;
    }
}

// Cerrar lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxActive = false;
    }
}

// Actualizar imagen del lightbox
function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const currentImage = currentImageUrls[currentImageIndex];
    if (lightboxImage && currentImage) {
        lightboxImage.src = currentImage.url;
        lightboxImage.alt = `${currentImage.nombre} - ${currentImage.type === 'antes' ? 'Antes' : 'Después'}`;
    }
}

// Actualizar contador
function updateLightboxCounter() {
    const counter = document.getElementById('lightboxCounter');
    if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${currentImageUrls.length}`;
    }
}

// Siguiente imagen
function nextImage() {
    if (currentImageIndex < currentImageUrls.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop infinito
    }
    updateLightboxImage();
    updateLightboxCounter();
}

// Anterior imagen
function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = currentImageUrls.length - 1; // Loop infinito
    }
    updateLightboxImage();
    updateLightboxCounter();
}

// Abrir WhatsApp con el mensaje del servicio
function openWhatsAppForCurrentService() {
    const trabajo = trabajosData.find(t => t.id === currentCardId);
    if (!trabajo) return;
    
    const telefono = '34123456789'; // Cambiar por el número real
    const mensaje = encodeURIComponent(`Hola, me encanta el trabajo de "${trabajo.nombre}". ¿Podéis hacerme algo similar?`);
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}

// ============================================
// FUNCIONES DEL CARRUSEL INTERNO (cards)
// ============================================

// Función para renderizar trabajos con carrusel interno
function renderizarTrabajos(trabajos) {
    const container = document.getElementById('trabajosGrid');
    if (!container) return;
    
    if (trabajos.length === 0) {
        container.innerHTML = '<div class="no-trabajos">No hay trabajos disponibles para esta categoría</div>';
        return;
    }
    
    container.innerHTML = trabajos.map(trabajo => `
        <div class="trabajo-card" data-id="${trabajo.id}" data-categoria="${trabajo.categoria}">
            <div class="trabajo-carrusel-container">
                <button class="carrusel-prev" data-id="${trabajo.id}">❮</button>
                <div class="trabajo-imagenes" id="imagenes-${trabajo.id}">
                    ${renderizarImagenes(trabajo, 0)}
                </div>
                <button class="carrusel-next" data-id="${trabajo.id}">❯</button>
            </div>
            <div class="carrusel-dots" id="dots-${trabajo.id}">
                ${renderizarDots(trabajo, 0)}
            </div>
            <div class="trabajo-info">
                <h3 class="trabajo-nombre">${trabajo.nombre}</h3>
                <p class="trabajo-descripcion">${trabajo.descripcion}</p>
            </div>
        </div>
    `).join('');
    
    // Inicializar carruseles para cada card
    trabajos.forEach(trabajo => {
        initCarruselCard(trabajo.id, trabajo.imagenes.length);
    });
}

// Renderizar imágenes (solo la activa)
function renderizarImagenes(trabajo, indexActivo) {
    const imagenes = trabajo.imagenes;
    const imagenActual = imagenes[indexActivo];
    
    return `
        <div class="trabajo-antes" data-image-type="antes" data-image-index="${indexActivo}">
            <img src="${imagenActual.antes}" alt="Antes - ${trabajo.nombre}" loading="lazy">
            <span class="etiqueta">ANTES</span>
        </div>
        <div class="trabajo-despues" data-image-type="despues" data-image-index="${indexActivo}">
            <img src="${imagenActual.despues}" alt="Después - ${trabajo.nombre}" loading="lazy">
            <span class="etiqueta">DESPUÉS</span>
        </div>
    `;
}

// Renderizar dots
function renderizarDots(trabajo, indexActivo) {
    const total = trabajo.imagenes.length;
    let dots = '';
    for (let i = 0; i < total; i++) {
        dots += `<span class="dot ${i === indexActivo ? 'active' : ''}" data-index="${i}"></span>`;
    }
    return dots;
}

// Inicializar carrusel para una card específica
function initCarruselCard(cardId, totalImagenes) {
    if (totalImagenes <= 1) return;
    
    let currentIndex = 0;
    const trabajo = trabajosData.find(t => t.id === cardId);
    if (!trabajo) return;
    
    const imagenesContainer = document.getElementById(`imagenes-${cardId}`);
    const dotsContainer = document.getElementById(`dots-${cardId}`);
    const prevBtn = document.querySelector(`.carrusel-prev[data-id="${cardId}"]`);
    const nextBtn = document.querySelector(`.carrusel-next[data-id="${cardId}"]`);
    
    if (!imagenesContainer) return;
    
    // Función para actualizar la imagen
    function updateImage(index) {
        currentIndex = index;
        const imagenActual = trabajo.imagenes[currentIndex];
        
        // Actualizar imágenes
        imagenesContainer.innerHTML = `
            <div class="trabajo-antes" data-image-type="antes" data-image-index="${currentIndex}">
                <img src="${imagenActual.antes}" alt="Antes - ${trabajo.nombre}" loading="lazy">
                <span class="etiqueta">ANTES</span>
            </div>
            <div class="trabajo-despues" data-image-type="despues" data-image-index="${currentIndex}">
                <img src="${imagenActual.despues}" alt="Después - ${trabajo.nombre}" loading="lazy">
                <span class="etiqueta">DESPUÉS</span>
            </div>
        `;
        
        // Reasignar eventos de lightbox a las nuevas imágenes
        attachLightboxEventsToCard(cardId);
        
        // Actualizar dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
    }
    
    // Evento anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = totalImagenes - 1;
            updateImage(newIndex);
        });
    }
    
    // Evento siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = currentIndex + 1;
            if (newIndex >= totalImagenes) newIndex = 0;
            updateImage(newIndex);
        });
    }
    
    // Eventos para los dots
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                updateImage(i);
            });
        });
    }
    
    // Swipe táctil para móvil
    let touchStartX = 0;
    let touchEndX = 0;
    const cardElement = document.querySelector(`.trabajo-card[data-id="${cardId}"]`);
    
    if (cardElement) {
        cardElement.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        cardElement.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe derecha -> anterior
                    let newIndex = currentIndex - 1;
                    if (newIndex < 0) newIndex = totalImagenes - 1;
                    updateImage(newIndex);
                } else {
                    // Swipe izquierda -> siguiente
                    let newIndex = currentIndex + 1;
                    if (newIndex >= totalImagenes) newIndex = 0;
                    updateImage(newIndex);
                }
            }
        });
    }
    
    // Asignar eventos de lightbox a las imágenes
    attachLightboxEventsToCard(cardId);
}

// Asignar eventos de lightbox a las imágenes de una card
function attachLightboxEventsToCard(cardId) {
    const card = document.querySelector(`.trabajo-card[data-id="${cardId}"]`);
    if (!card) return;
    
    const antesImgs = card.querySelectorAll('.trabajo-antes');
    const despuesImgs = card.querySelectorAll('.trabajo-despues');
    
    antesImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const imageIndex = parseInt(img.dataset.imageIndex);
            openLightbox(cardId, imageIndex, 'antes');
        });
    });
    
    despuesImgs.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const imageIndex = parseInt(img.dataset.imageIndex);
            openLightbox(cardId, imageIndex, 'despues');
        });
    });
}

// ============================================
// CONFIGURAR FILTROS
// ============================================
function initFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtros.forEach(f => f.classList.remove('active'));
            filtro.classList.add('active');
            
            const filtroValor = filtro.dataset.filtro;
            if (filtroValor === 'todos') {
                renderizarTrabajos(trabajosData);
            } else {
                const trabajosFiltrados = trabajosData.filter(t => t.categoria === filtroValor);
                renderizarTrabajos(trabajosFiltrados);
            }
        });
    });
}

// ============================================
// INICIALIZAR LIGHTBOX (eventos globales)
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const whatsappBtn = document.getElementById('lightboxWhatsapp');
    
    if (!lightbox) return;
    
    // Cerrar con botón
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }
    
    // Botón WhatsApp
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', openWhatsAppForCurrentService);
    }
    
    // Eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (!lightboxActive) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Swipe táctil para lightbox
    let touchStart = 0;
    let touchEnd = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStart = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEnd = e.changedTouches[0].screenX;
        const diff = touchEnd - touchStart;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                prevImage();
            } else {
                nextImage();
            }
        }
    });
}

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderizarTrabajos(trabajosData);
    initFiltros();
    initLightbox();
    
    // Botón CTA (WhatsApp)
    const btnCTA = document.getElementById('btnReservarCTA');
    if (btnCTA) {
        btnCTA.addEventListener('click', () => {
            const telefono = '34123456789';
            const mensaje = encodeURIComponent('Hola, he visto vuestros trabajos y me gustaría reservar una cita en GoEstilistas!');
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
    }
});