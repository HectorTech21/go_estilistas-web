import Stripe from 'stripe';

// Inicializar Stripe con la clave secreta (vendrá de las variables de entorno)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // Configurar CORS para permitir llamadas desde tu frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Responder a peticiones OPTIONS (pre-vuelo de CORS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Solo aceptar peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
    }
    
    try {
        const { cartItems } = req.body;
        
        // Validar que el carrito no esté vacío
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }
        
        // Convertir productos al formato que Stripe espera
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    description: item.description || 'Producto de peluquería',
                },
                unit_amount: item.price, // Ya está en céntimos (ej: 1899 = 18.99€)
            },
            quantity: item.quantity,
        }));
        
        // Crear la sesión de pago en Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.URL_FRONTEND}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL_FRONTEND}/cancel.html`,
            shipping_address_collection: {
                allowed_countries: ['ES'],
            },
        });
        
        // Devolver la URL de pago al frontend
        return res.status(200).json({ url: session.url });
        
    } catch (error) {
        console.error('Error en checkout:', error);
        return res.status(500).json({ error: error.message });
    }
}