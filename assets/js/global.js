// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN A TODAS LAS PÁGINAS
// Menú hamburguesa responsive, Scroll Reveal, Modo oscuro, Reservar cita, Volver arriba, Cookies
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Global JS cargado correctamente');
    
    // ========== MODO OSCURO / CLARO ==========
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Actualizar SVGs en todos los botones de modo oscuro
        const darkModeBtns = document.querySelectorAll('.dark-mode-toggle');
        darkModeBtns.forEach(btn => {
            const lightIcon = btn.querySelector('.light-icon');
            const darkIcon = btn.querySelector('.dark-icon');
            
            if (lightIcon && darkIcon) {
                if (isDarkMode) {
                    lightIcon.style.display = 'none';
                    darkIcon.style.display = 'block';
                } else {
                    lightIcon.style.display = 'block';
                    darkIcon.style.display = 'none';
                }
            }
        });
        
        console.log('Modo oscuro activado:', isDarkMode);
    }
    
    function checkDarkModePreference() {
        const savedDarkMode = localStorage.getItem('darkMode');
        
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const darkModeBtns = document.querySelectorAll('.dark-mode-toggle');
            darkModeBtns.forEach(btn => {
                const lightIcon = btn.querySelector('.light-icon');
                const darkIcon = btn.querySelector('.dark-icon');
                
                if (lightIcon && darkIcon) {
                    lightIcon.style.display = 'none';
                    darkIcon.style.display = 'block';
                }
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
        
        // Cabecera del menú
        menu.innerHTML = `
            <div class="menu-header">
                <div class="logo">
                    <span>GoEstilistas!</span>
                </div>
                <div class="menu-header-buttons">
                    <button class="dark-mode-toggle" id="darkModeToggleMobile">
                        <svg class="light-icon" width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                        </svg>
                        <svg class="dark-icon" width="22" height="22" viewBox="0 0 256 256" fill="currentColor" style="display: none;">
                            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
                        </svg>
                    </button>
                    <button class="close-menu" id="closeMenuBtn">&times;</button>
                </div>
            </div>
            <div class="menu-nav">
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="servicios.html">Servicios</a></li>
                    <li><a href="quienes-somos.html">Quiénes somos</a></li>
                    <li><a href="trabajos.html">Nuestros trabajos</a></li>
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
                const lightIcon = darkModeToggleMobile.querySelector('.light-icon');
                const darkIcon = darkModeToggleMobile.querySelector('.dark-icon');
                if (lightIcon && darkIcon) {
                    if (isDarkMode) {
                        lightIcon.style.display = 'none';
                        darkIcon.style.display = 'block';
                    } else {
                        lightIcon.style.display = 'block';
                        darkIcon.style.display = 'none';
                    }
                }
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
    
    // ========== COOKIES PANEL Y BOTÓN FLOTANTE ==========
    
    const cookiesPanel = document.getElementById('cookiesPanel');
    const cookiesFloatBtn = document.getElementById('cookiesFloatBtn');
    const acceptBtn = document.getElementById('cookiesAccept');
    const rejectBtn = document.getElementById('cookiesReject');
    const necessaryBtn = document.getElementById('cookiesNecessary');
    
    const COOKIES_KEY = 'goestilistas_cookies_consent';
    
    // Función para abrir el panel
    function openCookiesPanel() {
        if (cookiesPanel) {
            cookiesPanel.classList.add('show');
        }
    }
    
    // Función para cerrar el panel
    function closeCookiesPanel() {
        if (cookiesPanel) {
            cookiesPanel.classList.remove('show');
        }
    }
    
    // Función para guardar preferencia y cerrar
    function saveCookiesPreference(choice) {
        localStorage.setItem(COOKIES_KEY, choice);
        closeCookiesPanel();
        console.log(`Cookies: ${choice}`);
    }
    
    // Eventos de los botones del panel
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => saveCookiesPreference('all'));
    }
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => saveCookiesPreference('reject'));
    }
    if (necessaryBtn) {
        necessaryBtn.addEventListener('click', () => saveCookiesPreference('necessary'));
    }
    
    // Evento del botón flotante
    if (cookiesFloatBtn) {
        cookiesFloatBtn.addEventListener('click', openCookiesPanel);
    }
    
    // Cerrar panel al hacer clic fuera del contenido
    if (cookiesPanel) {
        cookiesPanel.addEventListener('click', (e) => {
            if (e.target === cookiesPanel) {
                closeCookiesPanel();
            }
        });
    }
    
    // Verificar si ya hay preferencia guardada
    function checkCookiesConsent() {
        const savedPreference = localStorage.getItem(COOKIES_KEY);
        
        // Si no hay preferencia guardada, mostrar el panel automáticamente
        if (!savedPreference && cookiesPanel) {
            setTimeout(() => {
                openCookiesPanel();
            }, 500);
        }
    }
    
    // Inicializar
    checkCookiesConsent();
});