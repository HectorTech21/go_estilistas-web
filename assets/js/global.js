// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN A TODAS LAS PÁGINAS
// Menú hamburguesa, Scroll Reveal
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
});