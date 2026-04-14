// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN A TODAS LAS PÁGINAS
// Menú hamburguesa responsive, Scroll Reveal, Modo oscuro, Reservar cita, Volver arriba
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Global JS cargado correctamente');
    
    // ========== MODO OSCURO / CLARO ==========
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Actualizar todos los botones de modo oscuro
        const darkModeBtns = document.querySelectorAll('.dark-mode-toggle');
        darkModeBtns.forEach(btn => {
            btn.textContent = isDarkMode ? '☀️' : '🌓';
        });
        
        console.log('Modo oscuro activado:', isDarkMode);
    }
    
    function checkDarkModePreference() {
        const savedDarkMode = localStorage.getItem('darkMode');
        
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const darkModeBtns = document.querySelectorAll('.dark-mode-toggle');
            darkModeBtns.forEach(btn => {
                btn.textContent = '☀️';
            });
            console.log('Modo oscuro cargado desde localStorage');
        }
    }
    
    // ========== MENÚ HAMBURGUESA RESPONSIVE (PANTALLA COMPLETA) ==========
    
    // Crear estructura del menú responsive si no existe
    function createMenuResponsive() {
        // Verificar si ya existe el menú para no duplicarlo
        if (document.querySelector('.menu-overlay')) return;
        
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        
        // Crear menú lateral
        const menu = document.createElement('div');
        menu.className = 'menu-responsive';
        
        // Cabecera del menú - SIN SUBMENÚ
        menu.innerHTML = `
            <div class="menu-header">
                <div class="logo">
                    <span>GoEstilistas!</span>
                </div>
                <div class="menu-header-buttons">
                    <button class="dark-mode-toggle" id="darkModeToggleMobile">🌓</button>
                    <button class="close-menu" id="closeMenuBtn">&times;</button>
                </div>
            </div>
            <div class="menu-nav">
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="servicios.html">Servicios</a></li>
                    <li><a href="quienes-somos.html">Quiénes somos</a></li>
                    <li><a href="trabaja-con-nosotros.html">Trabaja con nosotros</a></li>
                </ul>
                
                <!-- Botón Reservar Cita dentro del menú -->
                <button class="btn-reservar-menu" id="btnReservarMenu">
                    <i class="fab fa-whatsapp"></i> Reservar Cita
                </button>
            </div>
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
                    <a href="https://www.google.com/maps?q=Centro+Comercial+La+Vega+Alcobendas" target="_blank">Centro Comercial La Vega, Alcobendas</a>
                </div>
                <div class="menu-social">
                    <a href="https://instagram.com" target="_blank" class="social instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/34123456789" target="_blank" class="social whatsapp"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://facebook.com" target="_blank" class="social facebook"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(menu);
        
        // Eventos del menú
        const hamburguesa = document.querySelector('.menu-hamburguesa');
        const closeBtn = document.getElementById('closeMenuBtn');
        
        // Abrir menú
        if (hamburguesa) {
            hamburguesa.addEventListener('click', function() {
                overlay.classList.add('active');
                menu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Cerrar menú
        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }
        
        overlay.addEventListener('click', closeMenu);
        
        function closeMenu() {
            overlay.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Sincronizar modo oscuro con el botón del menú
        const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
        if (darkModeToggleMobile) {
            darkModeToggleMobile.addEventListener('click', function() {
                toggleDarkMode();
                const isDarkMode = document.body.classList.contains('dark-mode');
                darkModeToggleMobile.textContent = isDarkMode ? '☀️' : '🌓';
            });
        }
        
        // Botón Reservar Cita dentro del menú
        const btnReservarMenu = document.getElementById('btnReservarMenu');
        if (btnReservarMenu) {
            btnReservarMenu.addEventListener('click', function() {
                const telefono = '34123456789';
                const mensaje = encodeURIComponent('Hola, me gustaría reservar una cita en GoEstilistas!');
                window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
                closeMenu();
            });
        }
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
    
    // Asignar evento al botón de modo oscuro del header
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
    
    // ========== INICIALIZAR MENÚ RESPONSIVE ==========
    createMenuResponsive();
});