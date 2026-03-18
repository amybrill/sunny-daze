require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '/'))); // Serves index.html from root
app.use(express.json());
app.use(cors());

/**
 * Stripe Checkout Session Creation
 */
app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email, name } = req.body;

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
            // success_url includes the ?success=true flag to trigger the Spirit Board
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/`,
            metadata: {
                customer_name: name,
                product_request: priceId
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    --------------------------------------------------
    Sunny Daze Production Server Active
    Port: ${PORT}
    Root Directory: ${__dirname}
    --------------------------------------------------
    `);
});
