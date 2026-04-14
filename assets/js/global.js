// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN A TODAS LAS PÁGINAS
// Menú hamburguesa, Scroll Reveal, Modo oscuro, Reservar cita, Volver arriba
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
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        const darkModeBtn = document.getElementById('darkModeToggle');
        if (darkModeBtn) {
            darkModeBtn.textContent = isDarkMode ? '☀️' : '🌓';
        }
        
        console.log('Modo oscuro activado:', isDarkMode);
    }
    
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
    
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
        console.log('Botón modo oscuro encontrado y evento asignado');
    } else {
        console.log('Botón modo oscuro NO encontrado en esta página');
    }
    
    checkDarkModePreference();
    
    // ========== BOTÓN RESERVAR CITA (WhatsApp) ==========
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.addEventListener('click', function() {
            // CAMBIA ESTE NÚMERO POR EL TELÉFONO REAL DE LA PELUQUERÍA
            const telefono = '34123456789';
            const mensaje = encodeURIComponent('Hola, me gustaría reservar una cita en GoEstilistas!');
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
        console.log('Botón reservar cita configurado');
    } else {
        console.log('Botón reservar cita NO encontrado en esta página');
    }
    
    // ========== INDICADOR DE PÁGINA ACTIVA ==========
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinksItems = document.querySelectorAll('.nav-links li a');
        
        navLinksItems.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActivePage();
    
    // ========== BOTÓN VOLVER ARRIBA ==========
    const btnVolverArriba = document.getElementById('btnVolverArriba');
    
    if (btnVolverArriba) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btnVolverArriba.classList.add('visible');
            } else {
                btnVolverArriba.classList.remove('visible');
            }
        });
        
        btnVolverArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('Botón volver arriba configurado');
    }
});