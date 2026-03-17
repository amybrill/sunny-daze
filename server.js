const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

// Fallback to your production URL if the environment variable isn't set
const DOMAIN = process.env.DOMAIN || 'https://sunny-daze-production.up.railway.app';

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email, name, item } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Removed payment_method_collection to fix the 400 error for one-time payments
            success_url: `${DOMAIN}/?success=true&type=${priceId === 'price_1T8EkfFumfdhryieksJcxBTW' ? 'quantum' : 'reveal'}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/?canceled=true`,
            metadata: {
                customer_name: name ? name.substring(0, 40) : "Guest",
                product_item: item 
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunny Daze Server running on port ${PORT}`));
