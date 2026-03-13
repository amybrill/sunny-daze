const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve all static files (images, html, css) from the main folder
app.use(express.static(__dirname));

// Main checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, userEmail, serviceName, clientUrl, couponCode } = req.body;

    try {
        // STEP 1: Define specific success paths for each product
        let successUrl = `${clientUrl}/confirmation.html`; // Default for email readings
        
        // Fix: Separate Soul Urge from Quantum
        if (serviceName.includes('Soul Urge')) {
            successUrl = `${clientUrl}/spirit-board.html`; // Takes them to the board
        } else if (serviceName.includes('Lucky Number')) {
            successUrl = `${clientUrl}/lucky-picks.html`; // Takes them to the lottery
        } else if (serviceName.includes('Quantum')) {
            successUrl = `${clientUrl}/index.html?unlocked=true`; // Unlocks the method on main page
        }

        // STEP 2: Logic for the "cosmic" bypass
        if (couponCode && couponCode.toLowerCase() === 'cosmic') {
            return res.json({ url: successUrl });
        }

        // STEP 3: Create Stripe Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            allow_promotion_codes: true, // Restores the coupon box on Stripe
            success_url: successUrl,
            cancel_url: clientUrl,
            metadata: { 
                serviceName: serviceName,
                customerEmail: userEmail 
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Serve the index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
