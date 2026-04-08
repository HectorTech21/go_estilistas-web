document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript cargado correctamente');
    
    const hamburguesa = document.querySelector('.menu-hamburguesa');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburguesa && navLinks) {
        hamburguesa.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            console.log('Menú clickeado');
        });
    }
    
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero', {
            origin: 'top',
            distance: '50px',
            duration: 1000,
            easing: 'ease-in-out',
            reset: false
        });
        
        ScrollReveal().reveal('.feature', {
            origin: 'bottom',
            distance: '40px',
            duration: 800,
            interval: 200,
            reset: false
        });
        
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