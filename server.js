const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const path = require('path'); // This is the key to finding your files
const app = express();

// 1. THE "WEBSITE" LOGIC (This was what went missing)
// This tells Railway: "Look in the current folder for the index.html"
app.use(express.static(__dirname));

// This handles the "Cannot GET /" error by serving your file at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. THE "PAYMENT" LOGIC (The new $9.63 frequency logic)
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            // Using your actual Railway URL for the return trip
            success_url: serviceName === 'Full Journey Access' 
                ? `${process.env.FRONTEND_URL}?success=true&unlocked=true` 
                : `${process.env.FRONTEND_URL}?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}?canceled=true`,
            metadata: { item_name: serviceName, user_email: userEmail }
        });
        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. THE PORT (Railway's connection)
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Sunny Daze is back online at port ${PORT}`));
