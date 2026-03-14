const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, userName, serviceName } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: `https://sunny-daze-production.up.railway.app/confirmation.html?userName=${encodeURIComponent(userName)}&serviceName=${encodeURIComponent(serviceName)}&unlocked=true`,
            cancel_url: `https://sunny-daze-production.up.railway.app/`
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
