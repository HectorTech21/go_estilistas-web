// ============================================
// TIENDA.JS - LÓGICA EXCLUSIVA DE LA TIENDA
// Carrito, productos, pago con Stripe
// ============================================

// Configuración
const API_URL = 'https://go-estilistas-web.vercel.app/api/create-checkout-session';
const CART_KEY = 'goestilistas_cart';

// Productos de ejemplo
const productos = [
    {
        id: 'prod_001',
        name: 'Champú Profesional',
        description: 'Champú reparador para todo tipo de cabello',
        price: 1899,
        imageIcon: 'fa-shampoo'
    },
    {
        id: 'prod_002',
        name: 'Acondicionador Hidratante',
        description: 'Acondicionador con aceite de argán',
        price: 1699,
        imageIcon: 'fa-hand-holding-heart'
    },
    {
        id: 'prod_003',
        name: 'Mascarilla Capilar',
        description: 'Tratamiento intensivo de nutrición',
        price: 2499,
        imageIcon: 'fa-jar'
    },
    {
        id: 'prod_004',
        name: 'Cera para Cabello',
        description: 'Cera de fijación fuerte, acabado mate',
        price: 1499,
        imageIcon: 'fa-paintbrush-pencil'
    },
    {
        id: 'prod_005',
        name: 'Pack GoEstilistas!',
        description: 'Champú + Acondicionador + Mascarilla',
        price: 4999,
        imageIcon: 'fa-gift'
    },
    {
        id: 'prod_006',
        name: 'Cepillo Alisador',
        description: 'Cepillo profesional con iones negativos',
        price: 2999,
        imageIcon: 'fa-brush'
    }
];

// ========== FUNCIONES DEL CARRITO ==========
function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    saveCart(cart);
    mostrarNotificacion(`${product.name} añadido al carrito`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
        }
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ========== NOTIFICACIONES ==========
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.position = 'fixed';
    notif.style.bottom = '100px';
    notif.style.right = '20px';
    notif.style.backgroundColor = '#4EA8DE';
    notif.style.color = 'white';
    notif.style.padding = '12px 20px';
    notif.style.borderRadius = '30px';
    notif.style.zIndex = '3000';
    notif.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    notif.style.animation = 'fadeOut 2s ease forwards';
    document.body.appendChild(notif);
    
    setTimeout(() => {
        if (notif.remove) notif.remove();
    }, 2000);
}

// ========== RENDERIZAR PRODUCTOS ==========
function renderProductos() {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;
    
    grid.innerHTML = productos.map(product => `
        <div class="producto-card" data-id="${product.id}">
            <div class="producto-imagen">
                <i class="fas ${product.imageIcon}"></i>
            </div>
            <div class="producto-info">
                <h3 class="producto-titulo">${product.name}</h3>
                <p class="producto-descripcion">${product.description}</p>
                <div class="producto-precio">${(product.price / 100).toFixed(2)}€</div>
                <button class="btn-add" data-id="${product.id}">Añadir al carrito</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            const product = productos.find(p => p.id === id);
            if (product) addToCart(product);
        });
    });
}

// ========== RENDERIZAR CARRITO ==========
function renderCarrito() {
    const cart = getCart();
    const container = document.getElementById('carritoItems');
    const totalElement = document.getElementById('carritoTotal');
    const contadorElement = document.getElementById('carritoContador');
    
    if (!container) return;
    
    const itemCount = getCartItemCount();
    if (contadorElement) contadorElement.textContent = itemCount;
    
    const total = getCartTotal();
    if (totalElement) totalElement.textContent = `${(total / 100).toFixed(2)}€`;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="carrito-vacio">Tu carrito está vacío</div>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="carrito-item" data-id="${item.id}">
            <div class="carrito-item-info">
                <div class="carrito-item-titulo">${item.name}</div>
                <div class="carrito-item-precio">${(item.price / 100).toFixed(2)}€</div>
            </div>
            <div class="carrito-item-cantidad">
                <button class="btn-decrementar" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="btn-incrementar" data-id="${item.id}">+</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-decrementar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            updateQuantity(id, -1);
        });
    });
    
    document.querySelectorAll('.btn-incrementar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            updateQuantity(id, 1);
        });
    });
}

function updateCartUI() {
    renderCarrito();
}

// ========== PAGO CON STRIPE ==========
async function goToCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }
    
    const btnPagar = document.getElementById('btnPagar');
    const textoOriginal = btnPagar.textContent;
    btnPagar.textContent = 'Procesando...';
    btnPagar.disabled = true;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: cart })
        });
        
        const data = await response.json();
        
        if (data.url) {
            localStorage.removeItem(CART_KEY);
            window.location.href = data.url;
        } else {
            mostrarNotificacion('Error al procesar el pago: ' + (data.error || 'Error desconocido'));
            btnPagar.textContent = textoOriginal;
            btnPagar.disabled = false;
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        mostrarNotificacion('Error de conexión. ¿Has desplegado el backend?');
        btnPagar.textContent = textoOriginal;
        btnPagar.disabled = false;
    }
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProductos();
    renderCarrito();
    
    // Scroll Reveal para productos
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.producto-card', {
            origin: 'bottom',
            distance: '40px',
            duration: 800,
            interval: 100,
            reset: false
        });
    }
    
    // Carrito lateral: abrir/cerrar
    const carritoLateral = document.getElementById('carritoLateral');
    const carritoIcono = document.getElementById('carritoIcono');
    const cerrarCarrito = document.getElementById('cerrarCarrito');
    
    if (carritoIcono && carritoLateral) {
        carritoIcono.addEventListener('click', () => {
            carritoLateral.classList.add('abierto');
        });
    }
    
    if (cerrarCarrito && carritoLateral) {
        cerrarCarrito.addEventListener('click', () => {
            carritoLateral.classList.remove('abierto');
        });
    }
    
    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (carritoLateral && carritoLateral.classList.contains('abierto')) {
            if (!carritoLateral.contains(e.target) && !carritoIcono.contains(e.target)) {
                carritoLateral.classList.remove('abierto');
            }
        }
    });
    
    // Botón de pago
    const btnPagar = document.getElementById('btnPagar');
    if (btnPagar) {
        btnPagar.addEventListener('click', goToCheckout);
    }
});