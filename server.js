const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

// HARDCODED TO YOUR EXACT URL
const DOMAIN = 'https://sunny-daze-production.up.railway.app';

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email, name } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            // Simplified URL to prevent handshaking errors
            success_url: `${DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/?canceled=true`,
            metadata: { customer_name: name, item_type: priceId }
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunny Daze Server running on port ${PORT}`));
