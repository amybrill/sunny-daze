require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const app = express();

// We removed the 'public' static line because your files are in the root
app.use(express.json());

// Routes to serve your files directly from the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// If you have ball.png in the root as well, this ensures it loads
app.get('/ball.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'ball.png'));
});

// The Stripe Checkout Logic
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { priceId, email, name } = req.body;

        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                customer_name: name,
                customer_email: email,
                product_id: priceId
            },
            // Redirect back to the root with the success trigger
            success_url: `https://sunny-daze-production.up.railway.app/?success=true`,
            cancel_url: `https://sunny-daze-production.up.railway.app/?canceled=true`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunny Daze Server running on port ${PORT}`));
