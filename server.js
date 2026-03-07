const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors'); // Essential for the handshake
const app = express();

// 1. HANDSHAKE CONFIGURATION (CORS)
// This allows your GitHub Pages site to talk to your Railway Server
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Set this to your GitHub URL in Railway Variables
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 2. CREATE CHECKOUT SESSION
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: userEmail,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // If they are buying the $9.63 'Full Journey Access', we add the unlock flag
            success_url: serviceName === 'Full Journey Access' 
                ? `${process.env.FRONTEND_URL}?success=true&unlocked=true` 
                : `${process.env.FRONTEND_URL}?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}?canceled=true`,
            metadata: {
                item_name: serviceName,
                user_email: userEmail
            }
        });

        // Sending the URL back to index.html for the redirect
        res.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Session Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 3. RAILWAY PORT BINDING
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Sunny Daze Server handshake active on port ${PORT}`));
