// ============================================
// SERVICIOS.JS - Datos y lógica de la página de servicios
// CON CARRUSEL INTERNO EN CADA CARD + CLASES POR CATEGORÍA
// ============================================

// Datos de servicios (basados en la lista proporcionada)
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

// Función para formatear duración (minutos a horas y minutos)
function formatearDuracion(minutos) {
    if (minutos < 60) return `${minutos} min`;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
}

// Función para formatear precio
function formatearPrecio(servicio) {
    if (servicio.precioVariable) {
        return `Desde ${servicio.precio}€`;
    }
    return `${servicio.precio}€`;
}

// Función para obtener la clase de categoría para el SVG decorativo
function getCategoriaClase(genero) {
    switch(genero) {
        case 'mujer':
            return 'category-mujer';
        case 'hombre':
            return 'category-hombre';
        case 'pack':
        case 'unisex':
            if (servicio.categoria.includes('Pack')) return 'category-pack';
            return 'category-unisex';
        default:
            return 'category-unisex';
    }
}

// Renderizar categorías y servicios
function renderizarServicios(filtro = 'todos') {
    const container = document.getElementById('categoriasContainer');
    if (!container) return;
    
    // Filtrar servicios
    let serviciosFiltrados = serviciosData;
    if (filtro === 'mujer') {
        serviciosFiltrados = serviciosData.filter(s => s.genero === 'mujer');
    } else if (filtro === 'hombre') {
        serviciosFiltrados = serviciosData.filter(s => s.genero === 'hombre');
    } else if (filtro === 'pack') {
        serviciosFiltrados = serviciosData.filter(s => s.categoria.includes('Pack'));
    }
    
    // Agrupar por categoría
    const categorias = {};
    serviciosFiltrados.forEach(servicio => {
        if (!categorias[servicio.categoria]) {
            categorias[servicio.categoria] = [];
        }
        categorias[servicio.categoria].push(servicio);
    });
    
    // Orden de categorías predefinido
    const ordenCategorias = [
        "Cortes y Peinados", "Coloración", "Mechas", "Tratamientos Capilares",
        "Lavados y Tratamientos", "Moldeadores", "Depilaciones", "Extensiones",
        "Packs Ofertas", "Packs Fin de Semana"
    ];
    
    // Renderizar
    if (Object.keys(categorias).length === 0) {
        container.innerHTML = '<div class="no-servicios">No hay servicios disponibles para esta categoría</div>';
        return;
    }
    
    container.innerHTML = ordenCategorias
        .filter(cat => categorias[cat])
        .map(cat => `
            <div class="categoria" data-categoria="${cat}">
                <h2 class="categoria-titulo">${cat}</h2>
                <div class="servicios-grid">
                    ${categorias[cat].map(servicio => {
                        let categoriaClase = '';
                        if (servicio.genero === 'mujer') categoriaClase = 'category-mujer';
                        else if (servicio.genero === 'hombre') categoriaClase = 'category-hombre';
                        else if (servicio.categoria.includes('Pack')) categoriaClase = 'category-pack';
                        else categoriaClase = 'category-unisex';
                        
                        return `
                            <div class="servicio-item ${categoriaClase}">
                                <div class="servicio-info">
                                    <div class="servicio-nombre">${servicio.nombre}</div>
                                    <div class="servicio-detalles">
                                        <span class="servicio-precio">${formatearPrecio(servicio)}</span>
                                        <span class="servicio-duracion">
                                            <i class="far fa-clock"></i> ${formatearDuracion(servicio.duracion)}
                                        </span>
                                    </div>
                                </div>
                                <button class="servicio-boton" data-nombre="${servicio.nombre}">
                                    <i class="fab fa-whatsapp"></i> Reservar
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
    
    // Añadir eventos a los botones de reserva
    document.querySelectorAll('.servicio-boton').forEach(btn => {
        btn.addEventListener('click', () => {
            const nombreServicio = btn.dataset.nombre;
            const telefono = '34123456789';
            const mensaje = encodeURIComponent(`Hola, me gustaría reservar el servicio: ${nombreServicio} en GoEstilistas!`);
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
    });
}

// Configurar filtros
function initFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtros.forEach(f => f.classList.remove('active'));
            filtro.classList.add('active');
            const filtroValor = filtro.dataset.filtro;
            renderizarServicios(filtroValor);
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderizarServicios('todos');
    initFiltros();
});