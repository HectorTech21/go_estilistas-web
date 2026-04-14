// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MODO OSCURO ==========
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Cambiar icono (luna/sol)
        document.querySelectorAll('.dark-mode-toggle i').forEach(icon => {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
    
    function checkDarkModePreference() {
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            document.querySelectorAll('.dark-mode-toggle i').forEach(icon => {
                icon.className = 'fas fa-sun';
            });
        }
    }
    
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) darkModeBtn.addEventListener('click', toggleDarkMode);
    
    checkDarkModePreference();

    // ========== MENÚ HAMBURGUESA ==========
    function createMenuResponsive() {
        if (document.querySelector('.menu-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        const menu = document.createElement('div');
        menu.className = 'menu-responsive';
        menu.innerHTML = `
            <div class="menu-header">
                <div class="logo"><span>Go Estilistas</span></div>
                <div class="menu-header-buttons">
                    <button class="dark-mode-toggle" id="darkModeToggleMobile" aria-label="Cambiar modo de color"><i class="fas fa-moon"></i></button>
                    <button class="close-menu" id="closeMenuBtn" aria-label="Cerrar menú">&times;</button>
                </div>
            </div>
            <nav class="menu-nav">
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="servicios.html">Servicios</a></li>
                    <li><a href="quienes-somos.html">Quiénes somos</a></li>
                    <li><a href="trabaja-con-nosotros.html">Trabaja con nosotros</a></li>
                </ul>
                <button class="btn-reservar-menu" id="btnReservarMenu">
                    <i class="fab fa-whatsapp"></i> Reservar Cita
                </button>
            </nav>
            <div class="menu-contacto">
                <h4>Contacto</h4>
                <div class="contacto-item-menu">
                    <i class="fas fa-phone"></i>
                    <a href="tel:+34123456789">+34 123 456 789</a>
                </div>
                <div class="contacto-item-menu">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:info@goestilistas.com">info@goestilistas.com</a>
                </div>
                <div class="contacto-item-menu">
                    <i class="fas fa-map-marker-alt"></i>
                    <a href="https://www.google.com/maps?q=Centro+Comercial+La+Vega+Alcobendas" target="_blank">C.C. La Vega, Alcobendas</a>
                </div>
                <div class="menu-social">
                    <a href="https://instagram.com" target="_blank" class="social instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/34123456789" target="_blank" class="social whatsapp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://facebook.com" target="_blank" class="social facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(menu);
        
        const hamburguesa = document.querySelector('.menu-hamburguesa');
        const closeBtn = document.getElementById('closeMenuBtn');
        
        function closeMenu() {
            overlay.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (hamburguesa) hamburguesa.addEventListener('click', () => {
            overlay.classList.add('active');
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
        
        // Modo oscuro móvil
        const darkModeMobile = document.getElementById('darkModeToggleMobile');
        if (darkModeMobile) darkModeMobile.addEventListener('click', toggleDarkMode);
        
        // Reservar móvil
        const btnReservarMenu = document.getElementById('btnReservarMenu');
        if (btnReservarMenu) btnReservarMenu.addEventListener('click', function() {
            window.open('https://wa.me/34123456789?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20cita%20en%20GoEstilistas!', '_blank');
            closeMenu();
        });
    }
    
    createMenuResponsive();

    // ========== BOTÓN RESERVAR (HEADER) ==========
    const btnReservar = document.getElementById('btnReservar');
    if (btnReservar) {
        btnReservar.addEventListener('click', function() {
            window.open('https://wa.me/34123456789?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20cita%20en%20GoEstilistas!', '_blank');
        });
    }

    // ========== PÁGINA ACTIVA ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // ========== VOLVER ARRIBA ==========
    const btnVolverArriba = document.getElementById('btnVolverArriba');
    if (btnVolverArriba) {
        window.addEventListener('scroll', () => {
            btnVolverArriba.classList.toggle('visible', window.scrollY > 400);
        });
        btnVolverArriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ========== SCROLL REVEAL ==========
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal();
        if (document.querySelector('.hero')) sr.reveal('.hero-contenido', { origin: 'left', distance: '40px', duration: 800 });
        if (document.querySelector('.hero-imagen')) sr.reveal('.hero-imagen', { origin: 'right', distance: '40px', duration: 800, delay: 200 });
        if (document.querySelector('.features')) sr.reveal('.feature', { origin: 'bottom', distance: '30px', duration: 600, interval: 150 });
        sr.reveal('.testimonios-header', { origin: 'bottom', distance: '20px', duration: 600 });
        sr.reveal('.footer-container', { origin: 'bottom', distance: '20px', duration: 600 });
    }
});