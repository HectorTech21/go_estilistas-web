// ============================================
// TRABAJOS.JS - Datos y lógica de la galería de trabajos
// ============================================

// Datos de trabajos (ejemplo - CAMBIAR POR IMÁGENES REALES)
const trabajosData = [
    {
        id: 1,
        nombre: "Balayage + matiz",
        descripcion: "Suave transición de color natural con reflejos miel",
        categoria: "coloracion",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Balayage",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Balayage"
    },
    {
        id: 2,
        nombre: "Corte bob texturizado",
        descripcion: "Moderno, fresco y fácil de peinar",
        categoria: "cortes",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Corte+bob",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Corte+bob"
    },
    {
        id: 3,
        nombre: "Mechas californianas",
        descripcion: "Efecto solar degradado muy natural",
        categoria: "coloracion",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Mechas",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Mechas"
    },
    {
        id: 4,
        nombre: "Recogido novia",
        descripcion: "Elegante y romántico para ocasiones especiales",
        categoria: "peinados",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Recogido",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Recogido"
    },
    {
        id: 5,
        nombre: "Tratamiento botox capilar",
        descripcion: "Recuperación y brillo intenso para el cabello",
        categoria: "tratamientos",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Botox",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Botox"
    },
    {
        id: 6,
        nombre: "Corte degradado hombre",
        descripcion: "Estilo moderno y desenfadado",
        categoria: "cortes",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Corte+hombre",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Corte+hombre"
    },
    {
        id: 7,
        nombre: "Peinado ondas playeras",
        descripcion: "Ondas suaves y naturales con mucho movimiento",
        categoria: "peinados",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Ondas",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Ondas"
    },
    {
        id: 8,
        nombre: "Coloración fantasía",
        descripcion: "Rosas pastel para un look atrevido",
        categoria: "coloracion",
        imagenAntes: "https://placehold.co/400x300/FF9F4A/white?text=ANTES+Fantasía",
        imagenDespues: "https://placehold.co/400x300/4EA8DE/white?text=DESPUÉS+Fantasía"
    }
];

// Función para renderizar trabajos
function renderizarTrabajos(trabajos) {
    const container = document.getElementById('trabajosGrid');
    if (!container) return;
    
    if (trabajos.length === 0) {
        container.innerHTML = '<div class="no-trabajos">No hay trabajos disponibles para esta categoría</div>';
        return;
    }
    
    container.innerHTML = trabajos.map(trabajo => `
        <div class="trabajo-card" data-categoria="${trabajo.categoria}">
            <div class="trabajo-imagenes">
                <div class="trabajo-antes">
                    <img src="${trabajo.imagenAntes}" alt="Antes - ${trabajo.nombre}" loading="lazy">
                </div>
                <div class="trabajo-despues">
                    <img src="${trabajo.imagenDespues}" alt="Después - ${trabajo.nombre}" loading="lazy">
                </div>
            </div>
            <div class="trabajo-info">
                <h3 class="trabajo-nombre">${trabajo.nombre}</h3>
                <p class="trabajo-descripcion">${trabajo.descripcion}</p>
            </div>
        </div>
    `).join('');
}

// Configurar filtros
function initFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            // Actualizar clase activa
            filtros.forEach(f => f.classList.remove('active'));
            filtro.classList.add('active');
            
            // Filtrar trabajos
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderizarTrabajos(trabajosData);
    initFiltros();
    
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