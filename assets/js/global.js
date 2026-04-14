// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN A TODAS LAS PÁGINAS
// Menú hamburguesa, Scroll Reveal, Modo oscuro, Reservar cita
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Global JS cargado correctamente');
    
    // ========== MENÚ HAMBURGUESA (responsive) ==========
    const hamburguesa = document.querySelector('.menu-hamburguesa');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburguesa && navLinks) {
        hamburguesa.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            console.log('Menú hamburguesa clickeado');
        });
    }
    
    // ========== SCROLL REVEAL (animaciones) ==========
    if (typeof ScrollReveal !== 'undefined') {
        // Hero (solo si existe en la página)
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            ScrollReveal().reveal('.hero', {
                origin: 'top',
                distance: '50px',
                duration: 1000,
                easing: 'ease-in-out',
                reset: false
            });
        }
        
        // Features (solo si existen en la página)
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            ScrollReveal().reveal('.feature', {
                origin: 'bottom',
                distance: '40px',
                duration: 800,
                interval: 200,
                reset: false
            });
        }
        
        // Footer (todas las páginas)
        ScrollReveal().reveal('.footer-container', {
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            reset: false
        });
        
        console.log('ScrollReveal activado');
    } else {
        console.error('ScrollReveal no se cargó correctamente');
    }
    
    // ========== MODO OSCURO / CLARO ==========
    
    // Función para activar/desactivar modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Guardar preferencia en localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Actualizar texto del botón
        const darkModeBtn = document.getElementById('darkModeToggle');
        if (darkModeBtn) {
            darkModeBtn.textContent = isDarkMode ? '☀️' : '🌓';
        }
        
        // Debug: comprobar que funciona
        console.log('Modo oscuro activado:', isDarkMode);
    }
    
    // Verificar preferencia guardada al cargar la página
    function checkDarkModePreference() {
        const savedDarkMode = localStorage.getItem('darkMode');
        
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const darkModeBtn = document.getElementById('darkModeToggle');
            if (darkModeBtn) {
                darkModeBtn.textContent = '☀️';
            }
            console.log('Modo oscuro cargado desde localStorage');
        }
    }
    
    // Asignar evento al botón de modo oscuro
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
        console.log('Botón modo oscuro encontrado y evento asignado');
    } else {
        console.log('Botón modo oscuro NO encontrado en esta página');
    }
    
    // Inicializar modo oscuro
    checkDarkModePreference();
    
    // ========== BOTÓN RESERVAR CITA (WhatsApp) ==========
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.addEventListener('click', function() {
            // CAMBIA ESTE NÚMERO POR EL TELÉFONO REAL DE LA PELUQUERÍA
            // Formato: código país + número sin símbolos (ej: 34612345678)
            const telefono = '34123456789';
            const mensaje = encodeURIComponent('Hola, me gustaría reservar una cita en GoEstilistas!');
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
        console.log('Botón reservar cita configurado');
    } else {
        console.log('Botón reservar cita NO encontrado en esta página');
    }
});