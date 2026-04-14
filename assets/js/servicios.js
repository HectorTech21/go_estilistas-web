// ============================================
// SERVICIOS.JS - Efecto de partículas llamativo para servicios.html
// Partículas más grandes, coloridas y con movimiento visible
// ============================================

(function() {
    window.addEventListener('load', function() {
        const container = document.querySelector('.servicios-container');
        if (!container) {
            console.log('No se encontró .servicios-container');
            return;
        }
        
        console.log('Iniciando partículas llamativas en servicios.html');
        
        // Asegurar que el contenedor tiene position relative
        container.style.position = 'relative';
        
        // Crear contenedor de partículas
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '0';
        
        container.insertBefore(particleContainer, container.firstChild);
        
        // MÁS PARTÍCULAS: 120 en lugar de 40
        const PARTICLE_COUNT = 120;
        
        // Colores más vivos
        const colors = [
            '#4EA8DE',  // Azul
            '#FF9F4A',  // Naranja
            '#6CB4EE',  // Azul claro
            '#FFB06A'   // Naranja claro
        ];
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.borderRadius = '50%';
            
            // TAMAÑO MÁS GRANDE: 4-10px
            const size = Math.random() * 6 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Posición inicial aleatoria
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Color aleatorio
            const color = colors[Math.floor(Math.random() * colors.length)];
            // Opacidad más alta: 0.3-0.5
            const opacity = Math.random() * 0.3 + 0.3;
            particle.style.backgroundColor = color;
            particle.style.opacity = opacity;
            
            // Sombra para que destaquen más
            particle.style.boxShadow = `0 0 5px ${color}`;
            
            // Movimiento más rápido: 8-15 segundos
            const duration = Math.random() * 7 + 8;
            
            // Movimiento más amplio
            const moveX = (Math.random() - 0.5) * 300;
            const moveY = (Math.random() - 0.5) * 300;
            
            // Animación
            const keyframes = [
                { transform: 'translate(0, 0)' },
                { transform: `translate(${moveX}px, ${moveY}px)` },
                { transform: 'translate(0, 0)' }
            ];
            
            const options = {
                duration: duration * 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            };
            
            particle.animate(keyframes, options);
            
            return particle;
        }
        
        // Crear todas las partículas
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particleContainer.appendChild(createParticle());
        }
        
        console.log(`Creadas ${PARTICLE_COUNT} partículas llamativas`);
    });
})();