// ============================================
// GLOBAL.JS - FUNCIONALIDAD COMÚN A TODAS LAS PÁGINAS
// Menú responsive, motion nativo, modo oscuro, reserva, volver arriba y cookies
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
            btn.setAttribute('aria-pressed', String(isDarkMode));
            btn.setAttribute('aria-label', isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro');
        });
        
        // Actualizar logo según modo oscuro/claro
        const logoDark = document.querySelector('.logo .logo-dark');
        const logoLight = document.querySelector('.logo .logo-light');
        if (logoDark && logoLight) {
            if (isDarkMode) {
                logoDark.style.display = 'block';
                logoLight.style.display = 'none';
            } else {
                logoDark.style.display = 'none';
                logoLight.style.display = 'block';
            }
        }
        
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
                btn.setAttribute('aria-pressed', 'true');
                btn.setAttribute('aria-label', 'Activar modo claro');
            });
            
            // Asegurar que el logo oscuro se muestra
            const logoDark = document.querySelector('.logo .logo-dark');
            const logoLight = document.querySelector('.logo .logo-light');
            if (logoDark && logoLight) {
                logoDark.style.display = 'block';
                logoLight.style.display = 'none';
            }
            
            console.log('Modo oscuro cargado desde localStorage');
        } else {
            document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
                btn.setAttribute('aria-pressed', 'false');
                btn.setAttribute('aria-label', 'Activar modo oscuro');
            });
            // Asegurar que el logo claro se muestra
            const logoDark = document.querySelector('.logo .logo-dark');
            const logoLight = document.querySelector('.logo .logo-light');
            if (logoDark && logoLight) {
                logoDark.style.display = 'none';
                logoLight.style.display = 'block';
            }
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
        overlay.setAttribute('aria-hidden', 'true');
        
        // Crear menú lateral
        const menu = document.createElement('div');
        menu.className = 'menu-responsive';
        menu.setAttribute('role', 'dialog');
        menu.setAttribute('aria-modal', 'true');
        menu.setAttribute('aria-label', 'Menú de navegación');
        menu.setAttribute('aria-hidden', 'true');
        
        // Cabecera del menú
        menu.innerHTML = `
            <div class="menu-header">
                <div class="logo">
                    <a href="index.html">
                        <img class="logo-dark" src="assets/img/Logo.png" alt="GoEstilistas! - Modo oscuro">
                        <img class="logo-light" src="assets/img/Logo2.png" alt="GoEstilistas! - Modo claro">
                    </a>
                </div>
                <div class="menu-header-buttons">
                    <button class="dark-mode-toggle" id="darkModeToggleMobile" type="button" aria-label="Activar modo oscuro" aria-pressed="false">
                        <svg class="light-icon" width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                            <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
                        </svg>
                        <svg class="dark-icon" width="22" height="22" viewBox="0 0 256 256" fill="currentColor" style="display: none;">
                            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
                        </svg>
                    </button>
                    <button class="close-menu" id="closeMenuBtn" type="button" aria-label="Cerrar menú">&times;</button>
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
                    <a href="tel:+34916623438">+34 916 623 438</a>
                </div>
                <div class="contacto-item-menu">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:goestilistas@outlook.com">goestilistas@outlook.com</a>
                </div>
                <div class="contacto-item-menu">
                    <i class="fas fa-map-marker-alt"></i>
                    <a href="https://www.google.com/maps?q=Centro+Comercial+La+Vega+Alcobendas" target="_blank">Centro Comercial La Vega, Alcobendas</a>
                </div>
                <div class="menu-social">
                    <a href="https://instagram.com" target="_blank" class="social instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/34916623438" target="_blank" class="social whatsapp"><i class="fab fa-whatsapp"></i></a>
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
                overlay.setAttribute('aria-hidden', 'false');
                menu.setAttribute('aria-hidden', 'false');
                hamburguesa.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
                closeBtn?.focus();
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
            overlay.setAttribute('aria-hidden', 'true');
            menu.setAttribute('aria-hidden', 'true');
            hamburguesa?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            hamburguesa?.focus();
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Sincronizar modo oscuro con el botón del menú
        const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
        if (darkModeToggleMobile) {
            const startsDark = document.body.classList.contains('dark-mode');
            const initialLightIcon = darkModeToggleMobile.querySelector('.light-icon');
            const initialDarkIcon = darkModeToggleMobile.querySelector('.dark-icon');
            if (initialLightIcon && initialDarkIcon) {
                initialLightIcon.style.display = startsDark ? 'none' : 'block';
                initialDarkIcon.style.display = startsDark ? 'block' : 'none';
            }
            darkModeToggleMobile.setAttribute('aria-pressed', String(startsDark));
            darkModeToggleMobile.setAttribute('aria-label', startsDark ? 'Activar modo claro' : 'Activar modo oscuro');

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
                const telefono = '34916623438';
                const mensaje = encodeURIComponent('Hola, me gustaría reservar una cita en GoEstilistas!');
                window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
                closeMenu();
            });
        }
    }
    
    // ========== SISTEMA DE MOTION NATIVO Y REUTILIZABLE ==========
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionTimers = new WeakMap();
    const panelTimers = new WeakMap();
    let motionObserver = null;

    const motionGroups = [
        { selector: '.hero .eyebrow, .servicios-hero .eyebrow, .trabajos-hero .eyebrow, .about-hero .eyebrow', type: 'reveal', delay: 0 },
        { selector: '.hero h1, .servicios-hero h1, .trabajos-hero h1, .about-hero h1', type: 'reveal', delay: 1 },
        { selector: '.hero .hero-texto, .servicios-hero .hero-lead, .trabajos-hero .hero-lead, .about-hero-text', type: 'reveal', delay: 2 },
        { selector: '.hero .hero-buttons, .servicios-hero .text-cta, .trabajos-hero-intro > p:not(.hero-lead)', type: 'reveal', delay: 3 },
        { selector: '.hero .hero-location', type: 'reveal', delay: 4 },
        { selector: '.hero-visual, .about-hero-visual', type: 'image', delay: 3 },
        { selector: '.philosophy .section-heading, .philosophy-copy, .section-intro-row, .salon-story-heading, .experience-content, .testimonials-heading-row, .final-cta-inner', type: 'reveal' },
        { selector: '.principle, .service-editorial-card, .testimonio-card', type: 'reveal', stagger: true },
        { selector: '.salon-gallery figure, .experience-image', type: 'image', stagger: true },
        { selector: '.servicios-heading-row, .catalogo-heading, .catalogo-controls, .closing-inner', type: 'reveal' },
        { selector: '.destacado-card, .categoria', type: 'reveal', stagger: true },
        { selector: '.portfolio-heading, .portfolio-notice, .portfolio-toolbar, .trabajos-cta-inner', type: 'reveal' },
        { selector: '.trabajo-case', type: 'reveal', stagger: true },
        { selector: '.team-heading, .philosophy-intro, .philosophy-list article, .salon-approach > .about-shell > div, .about-cta-inner', type: 'reveal', stagger: true },
        { selector: '.team-overview-media, .salon-approach figure', type: 'image' },
        { selector: '.team-overview-content', type: 'reveal', delay: 1 },
        { selector: '.team-profile-media', type: 'image', stagger: true },
        { selector: '.team-profile h3', type: 'reveal', stagger: true, offset: 1 },
        { selector: '.team-profile p', type: 'reveal', stagger: true, offset: 1 },
        { selector: '.footer-container', type: 'fade' }
    ];

    function decorateMotionElements() {
        motionGroups.forEach((group) => {
            document.querySelectorAll(group.selector).forEach((element, index) => {
                if (element.dataset.motionBound === 'true') return;
                element.dataset.motionBound = 'true';
                element.classList.add(`motion-${group.type}`);
                const delayStep = group.stagger
                    ? Math.min((index % 7) + (group.offset || 0), 6)
                    : (group.delay || 0);
                if (delayStep > 0) element.classList.add(`motion-delay-${delayStep}`);
            });
        });
    }

    function observeMotionElements() {
        const pending = document.querySelectorAll('[data-motion-bound="true"]:not(.is-visible)');
        if (!motionObserver) {
            pending.forEach((element) => element.classList.add('is-visible'));
            return;
        }
        pending.forEach((element) => motionObserver.observe(element));
    }

    function refreshMotion() {
        decorateMotionElements();
        observeMotionElements();
    }

    function initializeMotion() {
        if (reducedMotionMedia.matches || !('IntersectionObserver' in window)) {
            document.documentElement.classList.remove('motion-enabled');
            motionObserver?.disconnect();
            motionObserver = null;
            document.querySelectorAll('[data-motion-bound="true"]').forEach((element) => element.classList.add('is-visible'));
            return;
        }

        document.documentElement.classList.add('motion-enabled');
        if (!motionObserver) {
            motionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -8% 0px'
            });
        }
        refreshMotion();
    }

    function swapMotion(element, update, options = {}) {
        if (!element || reducedMotionMedia.matches) {
            update();
            refreshMotion();
            return;
        }

        const existingTimer = motionTimers.get(element);
        if (existingTimer) clearTimeout(existingTimer);
        element.classList.add('motion-swap', 'is-swapping-out');
        element.classList.toggle('motion-swap-x', options.axis === 'x');

        const timer = setTimeout(() => {
            update();
            refreshMotion();
            element.classList.remove('is-swapping-out');
            element.classList.add('is-swapping-in');
            requestAnimationFrame(() => requestAnimationFrame(() => {
                element.classList.remove('is-swapping-in');
            }));
            motionTimers.delete(element);
        }, options.outDuration || 120);

        motionTimers.set(element, timer);
    }

    function toggleMotionPanel(panel, expanded) {
        if (!panel) return;
        const existingTimer = panelTimers.get(panel);
        if (existingTimer) clearTimeout(existingTimer);
        panel.classList.add('motion-panel');

        if (reducedMotionMedia.matches) {
            panel.classList.remove('is-collapsed');
            panel.hidden = !expanded;
            return;
        }

        if (expanded) {
            panel.hidden = false;
            panel.classList.add('is-collapsed');
            requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.remove('is-collapsed')));
            return;
        }

        panel.classList.add('is-collapsed');
        const timer = setTimeout(() => {
            panel.hidden = true;
            panel.classList.remove('is-collapsed');
            panelTimers.delete(panel);
        }, 330);
        panelTimers.set(panel, timer);
    }

    function pulseMotion(element) {
        if (!element || reducedMotionMedia.matches) return;
        element.classList.remove('motion-pulse');
        requestAnimationFrame(() => {
            element.classList.add('motion-pulse');
            element.addEventListener('animationend', () => element.classList.remove('motion-pulse'), { once: true });
        });
    }

    window.GoMotion = {
        refresh: refreshMotion,
        swap: swapMotion,
        togglePanel: toggleMotionPanel,
        pulse: pulseMotion,
        isReduced: () => reducedMotionMedia.matches
    };

    initializeMotion();
    setTimeout(refreshMotion, 0);
    reducedMotionMedia.addEventListener('change', initializeMotion);
    
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
            const telefono = '34916623438';
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
    
    // ========== HEADER AL HACER SCROLL + BOTÓN VOLVER ARRIBA ==========
    const siteHeader = document.querySelector('.site-header, header');
    const btnVolverArriba = document.getElementById('btnVolverArriba');
    let scrollStateFrame = null;

    function updateScrollState() {
        siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);
        btnVolverArriba?.classList.toggle('visible', window.scrollY > 300);
        scrollStateFrame = null;
    }

    window.addEventListener('scroll', function() {
        if (scrollStateFrame) return;
        scrollStateFrame = requestAnimationFrame(updateScrollState);
    }, { passive: true });

    updateScrollState();

    if (btnVolverArriba) {
        
        btnVolverArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
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
            cookiesPanel.setAttribute('aria-hidden', 'false');
            acceptBtn?.focus();
        }
    }
    
    // Función para cerrar el panel
    function closeCookiesPanel() {
        if (cookiesPanel) {
            cookiesPanel.classList.remove('show');
            cookiesPanel.setAttribute('aria-hidden', 'true');
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
        cookiesPanel.setAttribute('aria-hidden', 'true');
        cookiesPanel.addEventListener('click', (e) => {
            if (e.target === cookiesPanel) {
                closeCookiesPanel();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cookiesPanel?.classList.contains('show')) {
            closeCookiesPanel();
            cookiesFloatBtn?.focus();
        }
    });
    
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
