require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { 
        priceId, 
        userEmail, 
        serviceName 
    } = req.body;

    const clientUrl = 'https://sunny-daze-production.up.railway.app';
    const successUrl = `${clientUrl}/?success=true`; 

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail, 
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true, 
            customer_creation: 'always', // 
            success_url: successUrl,
            cancel_url: clientUrl,
            // METADATA REMOVED - Keeping it simple
        });

        res.json({ id: session.id, url: session.url });
    } catch (e) {
        console.error("Stripe Error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Sunny Daze Server running on port ${PORT}`));
