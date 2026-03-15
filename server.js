require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.static(__dirname)); 
app.use(express.json());
app.use(cors());

/**
 * STRIPE CHECKOUT SESSION ROUTE
 * Handles both paid and 100% discounted (free) orders
 */
app.post('/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            // Allows the user to enter the "DESTINY" code
            allow_promotion_codes: true,

            // CRITICAL: Allows $0.00 checkout without requiring a credit card
            payment_method_collection: 'if_required',

            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            
            // Redirects after successful "purchase"
            success_url: `https://sunny-daze-production.up.railway.app/success.html`,
            cancel_url: `https://sunny-daze-production.up.railway.app/cancel.html`,
        });

        // Send the session URL back to the frontend to redirect the user
        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Fallback for React/Single Page App routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Port configuration for Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sunny Daze Server is running on port ${PORT}`);
});
