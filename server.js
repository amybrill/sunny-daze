const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
const path = require('path');

// Serves all files (index.html, ball.png, etc.) directly from your root directory
app.use(express.static(__dirname));
app.use(express.json());

// Serves the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Stripe Session Logic
app.post('/create-checkout-session', async (req, res) => {
    const { email, name, dob, city, time, partner, priceId } = req.body;

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
            metadata: {
                fullName: name,
                dateOfBirth: dob,
                birthCity: city,
                birthTime: time,
                partnerName: partner || 'N/A'
            },
            // Hardcoded URLs to ensure Stripe always finds its way back to your live site
            success_url: `https://sunny-daze-production.up.railway.app/?success=true`,
            cancel_url: `https://sunny-daze-production.up.railway.app/?canceled=true`,
        });

        res.json({ id: session.id });
    } catch (error) {
        // This will print the exact reason for the failure in your Railway Logs
        console.error("Stripe Error Details:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Railway provides the PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunny Daze live on Railway at port ${PORT}`));
