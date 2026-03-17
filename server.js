const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const DOMAIN = process.env.DOMAIN || 'https://sunny-daze.railway.app';

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email, name, item } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'payment',
            // Corrected Redirect Logic
            success_url: `${DOMAIN}/?success=true&type=${priceId === 'price_1T8EkfFumfdhryieksJcxBTW' ? 'quantum' : 'reveal'}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/?canceled=true`,
            metadata: {
                customer_name: name,
                product_item: item // This will now correctly pass "Soul Urge and Life Path Reveal Reading"
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunny Daze Server running on port ${PORT}`));
