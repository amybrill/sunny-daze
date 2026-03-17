
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

const DOMAIN = process.env.DOMAIN || 'https://sunny-daze.railway.app';

// CHECKOUT SESSION ROUTE
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email, name } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            // Success URL passes back the 'type' to unlock the specific content in index.html
            success_url: `${DOMAIN}/?success=true&type=${priceId.includes('T8Ekf') ? 'quantum' : 'reveal'}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/?canceled=true`,
            metadata: {
                customer_name: name,
                item_type: priceId
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// WEBHOOK FOR PERMANENT RECORDS (Optional but recommended)
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log(`Payment successful for ${session.metadata.customer_name}`);
    }

    res.json({ received: true });
});

// SERVE THE MAIN PAGE
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Sunny Daze Server running on port ${PORT}`));
