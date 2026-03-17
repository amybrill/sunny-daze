const express = require('express');
const app = express();
const path = require('path');
// Insert your actual sk_live key here
const stripe = require('stripe')('sk_live_51P6WvjFumfdhryie6v8W1vVlO8...'); 

// This line tells Express your files are in the main folder
app.use(express.static(__dirname));
app.use(express.json());

// ROUTE TO SERVE THE MAIN PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// STRIPE SESSION LOGIC
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { priceId } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'cashapp'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            allow_promotion_codes: true,
            success_url: `${req.headers.origin}/index.html?success=true`,
            cancel_url: `${req.headers.origin}/index.html`,
        });
        res.json({ id: session.id });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunny Daze is Live on Port ${PORT}`);
});
